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
import { Filter, MetaResponse, Order, OrderBy, RequestQueryParams } from "utils/params/query";


export const Employees = () => {
  // util hooks
  const dispatch = useDispatch();

  // Params
  const [queryParams, setQueryParams] = useState<RequestQueryParams<Employee>>({});

  // Sort
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy<Employee>>('firstname');

  // Filter
  const [filterBy, setFilterBy] = useState<OrderBy<Employee>>('firstname');

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
    meta
  }: {
    employees: Employee[];
    loading: boolean;
    success: SuccessResponse;
    meta: MetaResponse;
  } = useSelector(({ employee }: any) => employee);

  // feedback
  const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

  useEffect(() => {
    dispatch(get_employees_request(token, queryParams));

    return () => {
      dispatch(clear_auth_errors());
      dispatch(clear_auth_success());
    };
  }, [queryParams]);

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

  // Sorting
  const handleSort = (order: Order, orderBy: OrderBy<Employee>) => {
    setQueryParams({
      ...queryParams,
      order,
      orderBy
    });

    setOrder(order);
    setOrderBy(orderBy);
  }

  // Filtering
  const handleFilter = (filter: Filter<Employee>) => {
    setQueryParams({
      ...queryParams,
      filter
    })
  };


  // when editing employee
  const handleOnEdit = (employee: Employee, roleName: string) => {
    dispatch(update_employee_request(employee, roleName, token));
  };

  // when creating employee
  const handleOnCreate = (employee: Employee, roleName: string) => {
    dispatch(create_employee_request(employee, roleName, token));
  };

  const prepareToEdit = (employee: Employee) => {
    setEmployeeEdit(employee);
    setOpenEdit(true);
  };

  const prepareToDelete = (employee: Employee) => {
    setEmployeeDelete(employee);
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
     
      {/* 
<div className="w-full md:w-auto">
  <ListBox defaultItem={filteredClientsOption} displayName="display" items={filterClientsOptions} label="Filtered clients" onSelect={setFilteredClientsOption}></ListBox>
</div> */}

    </div>

    {/* Customer Table */}
    {
      loading ? 'loading' : employees?.length ? <EmployeeTable values={employees!} meta={meta} order={order} orderBy={orderBy} filterBy={filterBy} onDelete={prepareToDelete}
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