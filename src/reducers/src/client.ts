import { Client } from "types/Client";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	clients: Client[];
	authenticated?: Client;
	loading: boolean;
	errors?: Error[];
	success?: SuccessResponse;
} = {
	clients: [],
	loading: false,
};

export const clientReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// GET ALL
		case "@get/clients/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/clients/success": {
			const { clients } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				clients,
			};
		}

		case "@get/clients/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// GET ONE
		case "@get/client/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/client/success": {
			const { client } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				authenticated: client,
			};
		}

		case "@get/client/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// CREATE
		case "@create/client/request": {
			return { ...state, loading: true };
		}

		case "@create/client/success": {
			const { success, client } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				clients: [...state.clients, client],
				success,
			};
		}

		case "@create/client/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// UPDATE
		case "@update/client/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@update/client/success": {
			const { client: updated_client, success } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				clients: state.clients.map((client) =>
					client.id == updated_client.id ? updated_client : client
				),
				success,
			};
		}

		case "@update/client/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// DELETE
		case "@delete/client/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@delete/client/success": {
			const { id, success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				clients: state.clients.filter((client) => client.id !== id),
				success,
			};
		}

		case "@delete/client/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean

		case "@clear/client/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/client/success": {
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