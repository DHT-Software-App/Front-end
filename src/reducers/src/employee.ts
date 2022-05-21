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
			return {
				...state,
				loading: false,
				error: null,
				employees: payload,
			};
		}

		case "@get/employees/failure": {
			return {
				...state,
				loading: false,
				error: payload,
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
			return {
				...state,
				loading: false,
				error: null,
				authenticated: payload,
			};
		}

		case "@get/employee/failure": {
			return {
				...state,
				loading: false,
				error: payload,
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
			return {
				...state,
				loading: false,
				error: payload,
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
			return {
				...state,
				loading: false,
				error: null,
				employees: state.employees.map((employee) =>
					employee.id == payload.id ? payload : employee
				),
			};
		}

		case "@update/employee/failure": {
			return {
				...state,
				loading: false,
				error: payload,
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
			return {
				...state,
				loading: false,
				error: null,
				employees: state.employees.filter(
					(employee) => employee.id !== payload.id
				),
			};
		}

		case "@delete/employee/failure": {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}

		default: {
			return { ...state };
		}
	}
};
