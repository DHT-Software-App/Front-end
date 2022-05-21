import {
	create_employee_request,
	get_employees_request,
} from "actions/employee";
import { Confirmation } from "components/Confirmation";
import { DropDown } from "components/DropDown";
import { DropDownItem } from "components/DropDownItem";
import { EmployeeForm } from "components/EmployeeForm";
import { EmployeeTable } from "components/EmployeeTable";
import { Feedback } from "components/Feedback";
import { Modal } from "components/Modal";
import { useCan } from "hooks/useCan";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// Open within a modal
{
	/* <EmployeeForm initialValue={employee} /> */
}
export const EmployeesView = () => {
	// util hooks
	const dispatch = useDispatch();

	// for validate abilities
	const { can, unloadCan } = useCan();

	const [search, setSearch] = useState();
	const [filteredEmployee, setFilteredEmployee] = useState();

	// to preserve employee to edit
	const [employeeEdit, setEmployeeEdit] = useState<Employee>();

	// for modal open status
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const [openNew, setOpenNew] = useState<boolean>(false);

	const { auth: token } = useSelector(({ auth }: any) => auth);

	const {
		employees,
		loading,
		success,
	}: { employees: Employee[]; loading: boolean; success: SuccessResponse } =
		useSelector(({ employee }: any) => employee);

	// feedback
	const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

	useEffect(() => {
		dispatch(get_employees_request(token));
	}, []);

	useEffect(() => {
		if (success) {
			setSuccesses([...successes, success]);
		}
	}, [success]);

	const removeSuccess = (index: number) => {
		setSuccesses(successes.filter((success, i) => i != index));
	};

	const handleSearch = (ev: any) => {
		console.log(ev);
	};

	const handleOnEdit = (employee: Employee) => {
		setEmployeeEdit(employee);
		setOpenEdit(true);
	};

	// when creating employee
	const create = (employee: Employee, roleName: string) => {
		dispatch(create_employee_request(employee, roleName, token));
	};

	const handleFilteredEmployee = (ev: any) => {};

	return (
		<div className="flex flex-col gap-y-12 p-12 bg-gray-100 relative">
			{successes.map((success, index) => (
				<Feedback
					key={index}
					response={success}
					quit={() => removeSuccess(index)}
				/>
			))}

			<div className="flex justify-between items-baseline">
				<span className="uppercase font-bold text-xl text-blue-dark">
					manage employees
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
					{employeeEdit && (
						<EmployeeForm initialValue={employeeEdit} submit={() => {}} />
					)}
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
					<EmployeeForm initialValue={{}} submit={create} />
				</div>
			</Modal>
		</div>
	);
};
