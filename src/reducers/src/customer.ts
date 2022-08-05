import { Customer } from "types/Customer";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	customers: Customer[];
	authenticated?: Customer;
	loading: boolean;
	errors?: Error[];
	success?: SuccessResponse;
} = {
	customers: [],
	loading: false,
};

export const customerReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// GET ALL
		case "@get/customers/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/customers/success": {
			const { customers } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				customers,
			};
		}

		case "@get/customers/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// GET ONE
		case "@get/customer/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/customer/success": {
			const { customer } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				authenticated: customer,
			};
		}

		case "@get/customer/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// CREATE
		case "@create/customer/request": {
			return { ...state, loading: true };
		}

		case "@create/customer/success": {
			const { success, customer } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				customers: [...state.customers, customer],
				success,
			};
		}

		case "@create/customer/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// UPDATE
		case "@update/customer/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@update/customer/success": {
			const { customer: updated_customer, success } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				customers: state.customers.map((customer) =>
					customer.id == updated_customer.id ? updated_customer : customer
				),
				success,
			};
		}

		case "@update/customer/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// DELETE
		case "@delete/customer/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@delete/customer/success": {
			const { id, success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				customers: state.customers.filter((customer) => customer.id !== id),
				success,
			};
		}

		case "@delete/customer/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean

		case "@clear/customer/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/customer/success": {
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