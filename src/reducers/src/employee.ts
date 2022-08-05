import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	employees: Employee[];
	authenticated?: Employee;
	loading: boolean;
	errors?: Error[];
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
				errors: null,
				employees,
			};
		}

		case "@get/employees/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
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
				errors: null,
				authenticated: employee,
			};
		}

		case "@get/employee/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
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
				errors: null,
				employees: [...state.employees, employee],
				success,
			};
		}

		case "@create/employee/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
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
				errors: null,
				employees: state.employees.map((employee) =>
					employee.id == updated_employee.id ? updated_employee : employee
				),
				success,
			};
		}

		case "@update/employee/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
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
				errors: null,
				employees: state.employees.filter((employee) => employee.id !== id),
				success,
			};
		}

		case "@delete/employee/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean

		case "@clear/employee/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/employee/success": {
			return {
				...state,
				success: null,
			};
		}

		default: {
			return { ...state };
		}
	}
};