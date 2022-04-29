import { EmployeeForm } from "components/EmployeeForm";
import { EmployeeTable } from "components/EmployeeTable";
import React, { useState } from "react";
import { Employee } from "types/Employee";

const employee: Employee = {
	first_name: "Amber",
	last_name: "Abreu",
	city: "Santo Domingo Este",
	contact_1: "829-268-2153",
	contact_2: "829-268-2153",
	email_address: "ambar.abreu@gmail.com",
	state: "Santo Domingo",
	street: "Amalia, San Isidro",
	status: "desactive",
};

// Open within a modal
{
	/* <EmployeeForm initialValue={employee} /> */
}
export const EmployeesView = () => {
	const [search, setSearch] = useState();
	const [filteredEmployee, setFilteredEmployee] = useState();

	const handleSearch = (ev: any) => {
		console.log(ev);
	};

	const handleFilteredEmployee = (ev: any) => {};

	return (
		<div className="flex flex-col gap-y-8 px-12 py-8 bg-gray-100 flex-grow">
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
				<div className="flex justify-between items-center space-x-6">
					<span className="text-slate-500">Filtered Employee</span>
					<input
						type="text"
						name="filteredEmployee"
						placeholder="Search..."
						onChange={handleFilteredEmployee}
						className="text-sm placeholder-slate-400 font-normal shadow-sm shadow-gray rounded-md outline-none pl-6 pr-4 py-2 w-40"
					/>
				</div>
			</div>

			<EmployeeTable values={[employee]} />
		</div>
	);
};
