import { Account } from "types/Account";

const initialState: {
	auth?: Account;
	loading: boolean;
	isAuthenticated: boolean;
	error?: any;
} = {
	isAuthenticated: true,
	loading: false,
};

export const authReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// SIGN
		case "@sign/auth/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@sign/auth/success": {
			return {
				...state,
				loading: false,
				error: null,
				auth: payload,
				isAuthenticated: true,
			};
		}

		case "@sign/auth/failure": {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}

		case "@sign/clean/errors": {
			return {
				...state,
				error: null,
			};
		}

		case "@signout/auth/request": {
			return {
				...state,
				auth: null,
				isAuthenticated: false,
			};
		}

		default: {
			return { ...state };
		}
	}
};
