import { Search } from "@mui/icons-material";
import { clear_insurance_company_errors, clear_insurance_company_success } from "actions/insuranceCompany";
import {
  create_insurance_company_request,
  delete_insurance_company_request,
  get_insurance_companies_request,
  update_insurance_company_request,
} from "actions/insuranceCompany";
import { InsuranceCompanyForm } from "components/InsuranceCompanies/Form";
import { InsuranceCompaniesTable } from "components/InsuranceCompanies/Table";
import { Feedback } from "components/Feedback";
import { Modal } from "components/Modal";
import { Popup } from "components/Popup";
import { InsuranceCompanyEnum } from "enum/InsuranceCompanyEnum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InsuranceCompany } from "types/InsuranceCompany";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { Filter, MetaResponse, Order, OrderBy, RequestQueryParams } from "utils/params/query";


export const InsuranceCompanies = () => {
  // util hooks
  const dispatch = useDispatch();

  // Params
  const [queryParams, setQueryParams] = useState<RequestQueryParams<InsuranceCompany>>({});
  
  // Sort
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy<InsuranceCompany>>('company');

  // Filter
  const [filterBy, setFilterBy] = useState<OrderBy<InsuranceCompany>>('company');

  // to preserve insurance company to edit
  const [insuranceCompanyEdit, setInsuranceCompanyEdit] = useState<InsuranceCompany>();
  const [insuranceCompanyDelete, setInsuranceCompanyDelete] = useState<InsuranceCompany>();

  // for modal open status
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { auth: token } = useSelector(
    ({ auth }: any) => auth
  );

  const {
    insuranceCompanies,
    loading,
    success: successFromInsuranceCompany,
    meta
  }: {
    insuranceCompanies: InsuranceCompany[];
    loading: boolean;
    success: SuccessResponse;
    meta: MetaResponse;
  } = useSelector(({ insuranceCompany }: any) => insuranceCompany);



  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);


  useEffect(() => {
    dispatch(get_insurance_companies_request(token, queryParams));

    return () => {
      dispatch(clear_insurance_company_errors());
      dispatch(clear_insurance_company_success());
    };
  }, [queryParams]);

  useEffect(() => {
    if (successFromInsuranceCompany) {
      switch (successFromInsuranceCompany.code) {
        case InsuranceCompanyEnum.CREATED:
          setOpenNew(false);
          break;

        case InsuranceCompanyEnum.UPDATED:
          setOpenEdit(false);
          break;
      }

      setSuccesses([...successes, successFromInsuranceCompany]);
    }
  }, [successFromInsuranceCompany]);


  const removeSuccess = (index: number) => {
    setSuccesses(successes.filter((success, i) => i != index));
  };

  // Sorting
  const handleSort = (order: Order, orderBy: OrderBy<InsuranceCompany>) => {
    setQueryParams({
      ...queryParams,
      order,
      orderBy
    });

    setOrder(order);
    setOrderBy(orderBy);
  }

  // Filtering
  const handleFilter = (filter: Filter<InsuranceCompany>) => {
    setQueryParams({
      ...queryParams,
      filter
    })
  };

  // when editing insurance company
  const handleOnEdit = (insuranceCompany: InsuranceCompany) => {
    dispatch(update_insurance_company_request(insuranceCompany, token));
  };

  // when creating insurance company
  const handleOnCreate = (insuranceCompany: InsuranceCompany) => {
    dispatch(create_insurance_company_request(insuranceCompany, token));
  };


  const prepareToEdit = (insuranceCompany: InsuranceCompany) => {
    setInsuranceCompanyEdit(insuranceCompany);
    setOpenEdit(true);
  };

  const prepareToDelete = (insuranceCompany: InsuranceCompany) => {
    setInsuranceCompanyDelete(insuranceCompany);
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
        manage insurance companies
      </div>

      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenNew(true)}
        >
          create a new insurance companies
        </button>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
     
      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredInsuranceCompaniesOption} displayName="display" items={filterInsuranceCompaniesOptions} label="Filtered insurance companies" onSelect={setFilteredInsuranceCompaniesOption}></ListBox>
</div> */}

    </div>

    {/* Insurance Companies Table */}
    {
      loading ? 'loading' : insuranceCompanies?.length ? <InsuranceCompaniesTable values={insuranceCompanies!} meta={meta} order={order} orderBy={orderBy} filterBy={filterBy} onDelete={prepareToDelete}
      onEdit={prepareToEdit} onSort={handleSort} onFilter={handleFilter} onPageChange={(page) => setQueryParams({ ...queryParams, page })} onRowsPerPageChange={(per_page) => setQueryParams({ ...queryParams, per_page })} /> : <>Empty</>
    }


    {/* Modals */}

    {/* For new insurance company */}

    <Modal
      isOpen={openNew}
      closeModal={() => {
        setOpenNew(false);
      }}
    >
      <div className="px-6">
        <InsuranceCompanyForm initialValue={{
          name: '',
          email_address_1: '',
          email_address_2: '',
          street: '',
          zip: 0,
          contacts: [],
          state: '',
          city: '',
          company: '',
        }} submit={handleOnCreate} />
      </div>
    </Modal>



    {/* For editing Insurance Company */}
    <Modal
      isOpen={openEdit}
      closeModal={() => {
        setOpenEdit(false);
      }}
    >
      <div className="px-6">
        <InsuranceCompanyForm initialValue={insuranceCompanyEdit!} submit={handleOnEdit} />
      </div>
    </Modal>


    {/* Confirm delete */}
    <Modal
      isOpen={openDelete}
      closeModal={() => {
        setOpenDelete(false);
      }}>
      <Popup
        title={`Delete insuranceCompany.`}
        description={`Are you sure that you want to delete '${insuranceCompanyDelete?.name}'?`}
        accept={() => {
          dispatch(delete_insurance_company_request(insuranceCompanyDelete?.id!, token!));
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