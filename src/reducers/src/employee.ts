import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	employees: Employee[];
	authenticated?: Employee;
	loading: boolean;
	error?: any;
	success?: SuccessResponse;
} = {
	employees: [],
	loading: false,
};

export const employeeReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// GET ALL
		case "@get/employees/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/employees/success": {
			const { employees } = payload;
			return {
				...state,
				loading: false,
				error: null,
				employees,
			};
		}

		case "@get/employees/failure": {
			const { error } = payload;

			return {
				...state,
				loading: false,
				error,
			};
		}

		// GET ONE
		case "@get/employee/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/employee/success": {
			const { employee } = payload;

			return {
				...state,
				loading: false,
				error: null,
				authenticated: employee,
			};
		}

		case "@get/employee/failure": {
			const { error } = payload;

			return {
				...state,
				loading: false,
				error,
			};
		}

		// CREATE
		case "@create/employee/request": {
			return { ...state, loading: true };
		}

		case "@create/employee/success": {
			const { success, employee } = payload;
			return {
				...state,
				loading: false,
				error: null,
				employees: [...state.employees, employee],
				success,
			};
		}

		case "@create/employee/failure": {
			const { error } = payload;
			return {
				...state,
				loading: false,
				error,
			};
		}

		// UPDATE
		case "@update/employee/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@update/employee/success": {
			const { employee: updated_employee, success } = payload;
			return {
				...state,
				loading: false,
				error: null,
				employees: state.employees.map((employee) =>
					employee.id == updated_employee.id ? updated_employee : employee
				),
				success,
			};
		}

		case "@update/employee/failure": {
			const { error } = payload;

			return {
				...state,
				loading: false,
				error,
			};
		}

		// DELETE
		case "@delete/employee/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@delete/employee/success": {
			const { id, success } = payload;

			return {
				...state,
				loading: false,
				error: null,
				employees: state.employees.filter((employee) => employee.id !== id),
				success,
			};
		}

		case "@delete/employee/failure": {
			const { error } = payload;
			return {
				...state,
				loading: false,
				error,
			};
		}

		default: {
			return { ...state };
		}
	}
};
