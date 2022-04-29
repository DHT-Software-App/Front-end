import { Employee } from "types/Employee";

const initialState: {
	employees: Employee[];
	loading: boolean;
	error?: any;
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
				employees: payload,
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
			return {
				...state,
				loading: false,
				error: null,
				employees: [...state.employees, payload],
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
