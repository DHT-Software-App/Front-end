import { Search } from "@mui/icons-material";
import { clear_customer_errors, clear_customer_success } from "actions/customer";
import {
  create_customer_request,
  delete_customer_request,
  get_customers_request,
  update_customer_request,
} from "actions/customer";
import { CustomerForm } from "components/Customers/Form";
import { CustomersTable } from "components/Customers/Table";
import { Feedback } from "components/Feedback";
import { Modal } from "components/Modal";
import { Popup } from "components/Popup";
import { CustomerEnum } from "enum/CustomerEnum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Customer } from "types/Customer";
import { Filter, MetaResponse, Order, OrderBy, RequestQueryParams } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";


export const Customers = () => {
  // util hooks
  const dispatch = useDispatch();


  // Params
  const [queryParams, setQueryParams] = useState<RequestQueryParams<Customer>>({});

  // Sort
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy<Customer>>('firstname');

  // Filter
  const [filterBy, setFilterBy] = useState<OrderBy<Customer>>('firstname');

  // to preserve customer to edit
  const [customerEdit, setCustomerEdit] = useState<Customer>();
  const [customerDelete, setCustomerDelete] = useState<Customer>();

  // for modal open status
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { auth: token, success: successFromAuth } = useSelector(
    ({ auth }: any) => auth
  );

  const {
    customers,
    loading,
    success: successFromCustomer,
    meta
  }: {
    customers: Customer[];
    loading: boolean;
    success: SuccessResponse;
    meta: MetaResponse;
  } = useSelector(({ customer }: any) => customer);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_customers_request(token, queryParams));

    return () => {
      dispatch(clear_customer_errors());
      dispatch(clear_customer_success());
    };
  }, [queryParams]);

  useEffect(() => {
    if (successFromCustomer) {
      switch (successFromCustomer.code) {
        case CustomerEnum.CREATED:
          setOpenNew(false);
          break;

        case CustomerEnum.UPDATED:
          setOpenEdit(false);
          break;
      }

      setSuccesses([...successes, successFromCustomer]);
    }
  }, [successFromCustomer]);

  const removeSuccess = (index: number) => {
    setSuccesses(successes.filter((success, i) => i != index));
  };

  // Sorting
  const handleSort = (order: Order, orderBy: OrderBy<Customer>) => {
    setQueryParams({
      ...queryParams,
      order,
      orderBy
    });

    setOrder(order);
    setOrderBy(orderBy);
  }

  // Filtering
  const handleFilter = (filter: Filter<Customer>) => {
    setQueryParams({
      ...queryParams,
      filter
    })
  };

  // when editing customer
  const handleOnEdit = (customer: Customer) => {
    dispatch(update_customer_request(customer, token));
  };

  // when creating customer
  const handleOnCreate = (customer: Customer) => {
    dispatch(create_customer_request(customer, token));
  };

  const prepareToEdit = (customer: Customer) => {
    setCustomerEdit(customer);
    setOpenEdit(true);
  };

  const prepareToDelete = (customer: Customer) => {
    setCustomerDelete(customer);
    setOpenDelete(true);
  };


  return <div className="flex flex-col gap-y-8 p-12 bg-gray-100 relative">
    <div className="absolute top-0 left-0 w-full">
      {successes.map((success, index) => (
        <Feedback
          key={index}
          response={success}
          quit={() => removeSuccess(index)}
        />
      ))}
    </div>

    <div className="capitalize font-bold text-2xl text-slate-600 pb-6 flex flex-col md:flex-row justify-between items-baseline gap-8" style={{ borderBottom: "1px solid#e3e3e3" }}>

      <div className="p-4 w-full md:w-auto">
        manage customers
      </div>

      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenNew(true)}
        >
          create a new customer
        </button>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">

      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredClientsOption} displayName="display" items={filterClientsOptions} label="Filtered clients" onSelect={setFilteredClientsOption}></ListBox>
</div> */}

    </div>

    {/* Customer Table */}
    {
      loading ? 'loading' : customers?.length ? <CustomersTable values={customers!} meta={meta} order={order} orderBy={orderBy} filterBy={filterBy} onDelete={prepareToDelete}
      onEdit={prepareToEdit} onSort={handleSort} onFilter={handleFilter} onPageChange={(page) => setQueryParams({ ...queryParams, page })} onRowsPerPageChange={(per_page) => setQueryParams({ ...queryParams, per_page })} /> : <>Empty</>
    }


    {/* Modals */}

    {/* For new customer */}

    <Modal
      isOpen={openNew}
      closeModal={() => {
        setOpenNew(false);
      }}
    >
      <div className="px-6">
        <CustomerForm initialValue={{
          firstname: '',
          lastname: '',
          email_address: '',
          street: '',
          zip: 0,
          contacts: [],
          state: '',
          city: '',
          has_insured: false,
          insured_firstname: '',
          insured_lastname: ''
        }} submit={handleOnCreate} />
      </div>
    </Modal>



    {/* For editing customer */}
    <Modal
      isOpen={openEdit}
      closeModal={() => {
        setOpenEdit(false);
      }}
    >
      <div className="px-6">
        <CustomerForm initialValue={customerEdit!} submit={handleOnEdit} />
      </div>
    </Modal>


    {/* Confirm delete */}
    <Modal
      isOpen={openDelete}
      closeModal={() => {
        setOpenDelete(false);
      }}>
      <Popup
        title={`Delete Customer.`}
        description={`Are you sure that you want to delete '${customerDelete?.firstname} ${customerDelete?.lastname}'?`}
        accept={() => {
          dispatch(delete_customer_request(customerDelete?.id!, token!));
          setOpenDelete(false);
        }}
        cancel={() => {
          setOpenDelete(false);
        }}
        acceptClasses="text-white hover:bg-red-600 bg-red-500"
        iconBg="bg-red-100"
        acceptTitle="Remove"
        icon={<div></div>} />
    </Modal>


  </div>
};