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
import { SuccessResponse } from "utils/Responses/SuccessResponse";


export const Customers = () => {
  // util hooks
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [filteredCustomer, setFilteredCustomer] = useState();

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
  }: {
    customers: Customer[];
    loading: boolean;
    success: SuccessResponse;
  } = useSelector(({ customer }: any) => customer);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_customers_request(token));

    return () => {
      dispatch(clear_customer_errors());
      dispatch(clear_customer_success());
    };
  }, []);

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

  const handleSearch = (ev: any) => {
    console.log(ev);
  };

  // when editing customer
  const handleOnEdit = (customer: Customer) => {
    dispatch(update_customer_request(customer, token));
  };

  // when creating customer
  const handleOnCreate = (customer: Customer) => {
    dispatch(create_customer_request(customer, token));
  };

  const handleOnDelete = (id: number) => {
    dispatch(delete_customer_request(id, token));
  };

  const prepareToEdit = (customer: Customer) => {
    setCustomerEdit(customer);
    setOpenEdit(true);
  };

  const prepareToDelete = (customer: Customer) => {
    setCustomerDelete(customer);
    setOpenDelete(true);
  };

  const handleFilteredCustomer = (ev: any) => { };

  return <div className="flex flex-col gap-y-12 p-12 bg-gray-100 relative">
    <div className="absolute top-0 left-0 w-full z-50">
      {successes.map((success, index) => (
        <Feedback
          key={index}
          response={success}
          quit={() => removeSuccess(index)}
        />
      ))}
    </div>

    <div className="capitalize font-bold text-2xl text-slate-600 pb-6 mb-6 flex flex-col md:flex-row justify-between items-baseline gap-8" style={{ borderBottom: "1px solid#e3e3e3" }}>

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
      <div className="p-4 w-full md:w-auto">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <input type="text" className="w-full md:w-80 text-base bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for customers" />
        </div>
      </div>
      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredClientsOption} displayName="display" items={filterClientsOptions} label="Filtered clients" onSelect={setFilteredClientsOption}></ListBox>
</div> */}

    </div>

    {/* Customer Table */}
    {
      loading ? 'loading' : customers?.length ? <CustomersTable values={customers!} onDelete={prepareToDelete} onEdit={prepareToEdit} /> : <>Empty</>
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