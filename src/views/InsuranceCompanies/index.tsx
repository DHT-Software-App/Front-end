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


export const InsuranceCompanies = () => {
  // util hooks
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [filteredInsuranceCompany, setFilteredInsuranceCompany] = useState();

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
  }: {
    insuranceCompanies: InsuranceCompany[];
    loading: boolean;
    success: SuccessResponse;
  } = useSelector(({ insuranceCompany }: any) => insuranceCompany);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);


  useEffect(() => {
    dispatch(get_insurance_companies_request(token));

    return () => {
      dispatch(clear_insurance_company_errors());
      dispatch(clear_insurance_company_success());
    };
  }, []);

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

  const handleSearch = (ev: any) => {
    console.log(ev);
  };

  // when editing insurance company
  const handleOnEdit = (insuranceCompany: InsuranceCompany) => {
    dispatch(update_insurance_company_request(insuranceCompany, token));
  };

  // when creating insurance company
  const handleOnCreate = (insuranceCompany: InsuranceCompany) => {
    dispatch(create_insurance_company_request(insuranceCompany, token));
  };

  const handleOnDelete = (id: number) => {
    dispatch(delete_insurance_company_request(id, token));
  };

  const prepareToEdit = (insuranceCompany: InsuranceCompany) => {
    setInsuranceCompanyEdit(insuranceCompany);
    setOpenEdit(true);
  };

  const prepareToDelete = (insuranceCompany: InsuranceCompany) => {
    setInsuranceCompanyDelete(insuranceCompany);
    setOpenDelete(true);
  };

  const handleFilteredInsuranceCompany = (ev: any) => { };

  return <div className="flex flex-col gap-y-8 p-12 bg-gray-100 relative">
    <div className="absolute top-0 left-0 w-full z-50">
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
      <div className="p-4 w-full md:w-auto">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <input type="text" className="w-full md:w-80 text-base bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for insurance companies" />
        </div>
      </div>
      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredInsuranceCompaniesOption} displayName="display" items={filterInsuranceCompaniesOptions} label="Filtered insurance companies" onSelect={setFilteredInsuranceCompaniesOption}></ListBox>
</div> */}

    </div>

    {/* Insurance Companies Table */}
    {
      loading ? 'loading' : insuranceCompanies?.length ? <InsuranceCompaniesTable values={insuranceCompanies!} onDelete={prepareToDelete} onEdit={prepareToEdit} /> : <>Empty</>
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