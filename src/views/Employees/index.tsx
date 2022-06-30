// icons
import { Search } from "@mui/icons-material"
import { Modal } from "components/Modal";
import { EmployeeTable } from "components/Employees/Table"
import { Popup } from "components/Popup";
import { useState } from "react";
import { Employee } from "types/Employee";

const employee: Employee = {
  firstname: 'Gian Carlos',
  lastname: 'Perez Michel',
  email: 'adomini.edu@gmail.com',
  employee_status: true,
  street: 'Frenos No. 123',
  zip: 2323,
}


export const Employees = () => {
  const [openModalToDelete, setOpenModalToDelete] = useState<boolean>(false);

  // Employee Selected To Edit or To Delete
  const [employeeDelete, setEmployeeDelete] = useState<Employee>();

  // When push to concrete employee
  // const setEmployeeToEdit = (employee: Employee) => {
  //   setEmployeeEdit(employee);
  //   setOpenEdit(true);
  // };

  const setOneToDelete = (employee: Employee) => {
    setEmployeeDelete(employee);
    setOpenModalToDelete(true);
  };

  // handlers
  const handleOnDelete = (id: number) => {

  };


  return <div className="flex flex-col gap-y-12 p-12 bg-gray-100">
    <div className="capitalize font-bold text-2xl text-slate-600 pb-6 mb-6" style={{ borderBottom: "1px solid#e3e3e3" }}>
      manage employees
    </div>

    <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
      {/* Buscador de empleados */}
      <div className="p-4 w-full md:w-auto">
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <input type="text" className="w-full md:w-80 text-base bg-zinc-50 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for employees" />
        </div>
      </div>

      {/* Boton de crear empleados */}
      <div className="w-full md:w-auto">
        <button
          className="bg-blue-light w-full text-white uppercase text-sm font-bold px-8 py-4 rounded-md"
        // onClick={() => setOpenNew(true)}
        >
          create a new employee
        </button>
      </div>
    </div>

    <div>
      <EmployeeTable values={[
        employee
      ]} onDelete={setOneToDelete} onEdit={() => { }} />
    </div>

    {/* Confirmation Remove */}
    <Modal
      isOpen={openModalToDelete}
      closeModal={() => {
        setOpenModalToDelete(false);
      }}
    >
      <Popup
        title={`Eliminar empleado.`}
        description={`Seguro que quieres eliminar a '${employeeDelete?.firstname} ${employeeDelete?.lastname}'?`}
        accept={() => {
          handleOnDelete(employeeDelete?.id!);
          setOpenModalToDelete(false);
        }}
        cancel={() => {
          setOpenModalToDelete(false);
        }}
        acceptClasses="text-white hover:bg-red-600 bg-red-500"
        iconBg="bg-red-100"
        acceptTitle="Remove"
        icon={<div></div>}
      />
    </Modal>
  </div>
}