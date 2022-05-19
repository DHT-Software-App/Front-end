import { get_employees_request } from "actions/employee";
import { Confirmation } from "components/Confirmation";
import { DropDown } from "components/DropDown";
import { DropDownItem } from "components/DropDownItem";
import { EmployeeForm } from "components/EmployeeForm";
import { EmployeeTable } from "components/EmployeeTable";
import { Modal } from "components/Modal";
import { useAuth } from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "types/Employee";

// Open within a modal
{
	/* <EmployeeForm initialValue={employee} /> */
}
export const EmployeesView = () => {
	const [search, setSearch] = useState();
	const [filteredEmployee, setFilteredEmployee] = useState();
	const [employeeEdit, setEmployeeEdit] = useState<Employee>();
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const [openNew, setOpenNew] = useState<boolean>(false);

	const { auth: token } = useSelector(({ auth }: any) => auth);
	const { employees, loading } = useSelector(({ employee }: any) => employee);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_employees_request(token));
	}, []);

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
					<button
						className="bg-blue-light text-white uppercase text-xs font-semibold px-5 py-3 rounded-md"
						onClick={() => setOpenNew(true)}
					>
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

			{/* Edit Form */}
			<Modal
				isOpen={openEdit}
				closeModal={() => {
					setOpenEdit(false);
				}}
			>
				<div className="px-6">
					{employeeEdit && <EmployeeForm initialValue={employeeEdit} />}
				</div>
			</Modal>

			{/* New Form */}
			<Modal
				isOpen={openNew}
				closeModal={() => {
					setOpenNew(false);
				}}
			>
				<div className="px-6">
					<EmployeeForm initialValue={{}} />
				</div>
			</Modal>
		</div>
	);
};
