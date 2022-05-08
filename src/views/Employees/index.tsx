import { Confirmation } from "components/Confirmation";
import { DropDown } from "components/DropDown";
import { DropDownItem } from "components/DropDownItem";
import { EmployeeForm } from "components/EmployeeForm";
import { EmployeeTable } from "components/EmployeeTable";
import { Modal } from "components/Modal";
import React, { useState } from "react";
import { Employee } from "types/Employee";

const employees: Employee[] = [
	{
		first_name: "Amber Maite",
		last_name: "Abreu",
		city: "Santo Domingo Este",
		contact_1: "829-268-2153",
		contact_2: "829-268-2153",
		email_address: "ambar.abreu@gmail.com",
		state: "Santo Domingo",
		street: "Amalia, San Isidro",
		status: "desactive",
	},
	{
		first_name: "Gian Carlos",
		last_name: "Perez",
		city: "Bonao",
		contact_1: "829-042-2315",
		contact_2: "829-321-5233",
		email_address: "gian.carlos@gmail.com",
		state: "Monseñor Nouel",
		street: "Fanny Pimentel",
		status: "desactive",
	},
];

// Open within a modal
{
	/* <EmployeeForm initialValue={employee} /> */
}
export const EmployeesView = () => {
	const [search, setSearch] = useState();
	const [filteredEmployee, setFilteredEmployee] = useState();
	const [employeeEdit, setEmployeeEdit] = useState<Employee>();
	const [openEdit, setOpenEdit] = useState<boolean>(false);

	const handleSearch = (ev: any) => {
		console.log(ev);
	};

	const handleOnEdit = (employee: Employee) => {
		setEmployeeEdit(employee);
		setOpenEdit(true);
	};

	const handleFilteredEmployee = (ev: any) => {};

	return (
		<div className="flex flex-col gap-y-12 p-12 bg-gray-100">
			<div className="flex justify-between items-baseline">
				<span className="uppercase font-bold text-xl text-blue-dark">
					manage employes
				</span>
				<div>
					<button className="bg-blue-light text-white uppercase text-xs font-semibold px-5 py-3 rounded-md">
						create a new employee
					</button>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex justify-between items-center space-x-6">
					<span className="text-slate-500">Search Employee</span>
					<input
						type="search"
						name="search"
						placeholder="Search..."
						onChange={handleSearch}
						className="text-sm placeholder-slate-400 font-normal shadow-sm shadow-gray rounded-md outline-none pl-6 pr-4 py-2 w-80"
					/>
				</div>
				{/* <div className="flex justify-between items-center space-x-6">
					<span className="text-slate-500">Filtered Employee</span>
					<DropDown>
						<DropDownItem click={() => {}} active={true}>
							All Employees
						</DropDownItem>
						<DropDownItem click={() => {}}>Technician</DropDownItem>
						<DropDownItem click={() => {}}>
							Management Administrator
						</DropDownItem>
						<DropDownItem click={() => {}}>Basic Administrator</DropDownItem>
					</DropDown>
				</div> */}
			</div>

			<EmployeeTable values={employees} onEdit={handleOnEdit} />

			{/* <Modal open={true}>
				<Confirmation
					title="Eliminar elemento"
					description="Seguro que quieres eliminar el elemento?"
					accept={() => {}}
					cancel={() => {}}
					acceptClasses="text-white hover:bg-red-600 bg-red-500"
					iconBg="bg-red-100"
					acceptTitle="Remove"
					icon={<div></div>}
				/>
			</Modal> */}

			<Modal open={openEdit} opacity={true}>
				<div className="px-6">
					{employeeEdit && <EmployeeForm initialValue={employeeEdit} />}
				</div>
			</Modal>
		</div>
	);
};
