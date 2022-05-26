import { clear_auth_errors, clear_auth_success } from "actions/auth";
import {
	create_employee_request,
	delete_employee_request,
	get_employees_request,
	update_employee_request,
} from "actions/employee";
import { Confirmation } from "components/Confirmation";
import { DropDown } from "components/DropDown";
import { DropDownItem } from "components/DropDownItem";
import { EmployeeForm } from "components/EmployeeForm";
import { EmployeeTable } from "components/EmployeeTable";
import { Feedback } from "components/Feedback";
import { Modal } from "components/Modal";
import { EmployeeEnum } from "enum/EmployeeEnum";
import { useCan } from "hooks/useCan";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

	const handleFilteredEmployee = (ev: any) => {};

	return (
		<div className="flex flex-col gap-y-12 p-12 bg-gray-100 relative">
			<div className="absolute top-0 left-0 w-full z-50">
				{successes.map((success, index) => (
					<Feedback
						key={index}
						response={success}
						quit={() => removeSuccess(index)}
					/>
				))}
			</div>

			<div className="flex flex-col sm:flex-row justify-between items-baseline gap-5">
				<span className="uppercase font-bold text-xl text-blue-dark">
					manage employees
				</span>
				<div className="w-full sm:w-auto">
					{loading ? (
						<Skeleton className="px-5 py-3 rounded-md" height="100%" />
					) : (
						<button
							className="bg-blue-light w-full text-white uppercase text-xs font-semibold px-5 py-3 rounded-md"
							onClick={() => setOpenNew(true)}
						>
							create a new employee
						</button>
					)}
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center gap-x-6 w-full">
					<span className="text-slate-500 hidden sm:inline focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 duration-100">
						{loading || "Search Employee"}
					</span>

					{loading ? (
						<Skeleton
							height="100%"
							className="w-full sm:w-80 rounded-md pl-6 pr-4 py-2"
						/>
					) : (
						<input
							type="search"
							name="search"
							placeholder="Search..."
							onChange={handleSearch}
							className="text-sm w-full sm:w-80 placeholder-slate-400 font-normal shadow-sm shadow-gray rounded-md outline-none pl-6 pr-4 py-2"
						/>
					)}
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

			<EmployeeTable
				values={employees}
				onEdit={prepareToEdit}
				onDelete={prepareToDelete}
			/>

			<Modal
				isOpen={openDelete}
				closeModal={() => {
					setOpenDelete(false);
				}}
			>
				<Confirmation
					title={`Eliminar empleado.`}
					description={`Seguro que quieres eliminar a '${employeeDelete?.firstname} ${employeeDelete?.lastname}'?`}
					accept={() => {
						handleOnDelete(employeeDelete?.id!);
						setOpenDelete(false);
					}}
					cancel={() => {
						setOpenDelete(false);
					}}
					acceptClasses="text-white hover:bg-red-600 bg-red-500"
					iconBg="bg-red-100"
					acceptTitle="Remove"
					icon={<div></div>}
				/>
			</Modal>

			{/* Edit Form */}
			<Modal
				isOpen={openEdit}
				closeModal={() => {
					setOpenEdit(false);
				}}
			>
				<div className="px-6">
					{employeeEdit && (
						<EmployeeForm initialValue={employeeEdit} submit={handleOnEdit} />
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
					<EmployeeForm initialValue={{}} submit={handleOnCreate} />
				</div>
			</Modal>
		</div>
	);
};
