import { Search } from "@mui/icons-material";
import { clear_auth_errors, clear_auth_success } from "actions/auth";
import {
  create_employee_request,
  delete_employee_request,
  get_employees_request,
  update_employee_request,
} from "actions/employee";
import { EmployeeForm } from "components/Employees/Form";
import { EmployeeTable } from "components/Employees/Table";
import { Feedback } from "components/Feedback";
import { Modal } from "components/Modal";
import { Popup } from "components/Popup";
import { EmployeeEnum } from "enum/EmployeeEnum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// Open within a modal
{
  /* <EmployeeForm initialValue={employee} /> */
}
export const Employees = () => {
  // util hooks
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [filteredEmployee, setFilteredEmployee] = useState();

  // to preserve employee to edit
  const [employeeEdit, setEmployeeEdit] = useState<Employee>();
  const [employeeDelete, setEmployeeDelete] = useState<Employee>();

  // for modal open status
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { auth: token, success: successFromAuth } = useSelector(
    ({ auth }: any) => auth
  );

  const {
    employees,
    loading,
    success: successFromEmployee,
  }: {
    employees: Employee[];
    loading: boolean;
    success: SuccessResponse;
  } = useSelector(({ employee }: any) => employee);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_employees_request(token));

    return () => {
      dispatch(clear_auth_errors());
      dispatch(clear_auth_success());
    };
  }, []);

  useEffect(() => {
    if (successFromEmployee) {
      switch (successFromEmployee.code) {
        case EmployeeEnum.CREATED:
          setOpenNew(false);
          break;

        case EmployeeEnum.UPDATED:
          setOpenEdit(false);
          break;
      }

      setSuccesses([...successes, successFromEmployee]);
    }
  }, [successFromEmployee]);

  useEffect(() => {
    if (successFromAuth) {
      setSuccesses([...successes, successFromAuth]);
    }
  }, [successFromAuth]);

  const removeSuccess = (index: number) => {
    setSuccesses(successes.filter((success, i) => i != index));
  };

  const handleSearch = (ev: any) => {
    console.log(ev);
  };

  // when editing employee
  const handleOnEdit = (employee: Employee, roleName: string) => {
    dispatch(update_employee_request(employee, roleName, token));
  };

  // when creating employee
  const handleOnCreate = (employee: Employee, roleName: string) => {
    dispatch(create_employee_request(employee, roleName, token));
  };

  const handleOnDelete = (id: number) => {
    dispatch(delete_employee_request(id, token));
  };

  const prepareToEdit = (employee: Employee) => {
    setEmployeeEdit(employee);
    setOpenEdit(true);
  };

  const prepareToDelete = (employee: Employee) => {
    setEmployeeDelete(employee);
    setOpenDelete(true);
  };

  const handleFilteredEmployee = (ev: any) => { };

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
        manage employees
      </div>

      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
          onClick={() => setOpenNew(true)}
        >
          create a new employee
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
      loading ? 'loading' : employees?.length ? <EmployeeTable values={employees!} onDelete={prepareToDelete} onEdit={prepareToEdit} /> : <>Empty</>
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
        <EmployeeForm initialValue={{
          firstname: '',
          lastname: '',
          email_address: '',
          street: '',
          zip: 0,
          contacts: [],
          state: '',
          status: 'desactive',
          city: '',
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
        <EmployeeForm initialValue={employeeEdit!} submit={handleOnEdit} />
      </div>
    </Modal>


    {/* Confirm delete */}
    <Modal
      isOpen={openDelete}
      closeModal={() => {
        setOpenDelete(false);
      }}>
      <Popup
        title={`Delete Employee.`}
        description={`Are you sure that you want to delete '${employeeDelete?.firstname} ${employeeDelete?.lastname}'?`}
        accept={() => {
          dispatch(delete_employee_request(employeeDelete?.id!, token!));
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