import { Account } from "types/Account";

const initialState: {
	loading: boolean;
	existingAccount?: boolean;
	account?: Account;
	error?: any;
} = {
	loading: false,
};

export const accountReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// CREATE
		case "@create/account/request": {
			return {
				...state,
				loading: true,
				error: null,
			};
		}

		case "@create/account/success": {
			return {
				...state,
				loading: false,
				error: null,
				account: payload,
			};
		}

		case "@create/account/failure": {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}

		// RESET PASSWORD
		case "@reset/password/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@reset/password/success": {
			return {
				...state,
				loading: false,
				error: null,
				account: payload,
			};
		}

		case "@reset/account/failure": {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}

		// EXISTS ACCOUNT
		case "@exists/account/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@exists/account/success": {
			return {
				...state,
				loading: false,
				error: null,
				existingAccount: payload,
			};
		}

		case "@exists/account/failure": {
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
