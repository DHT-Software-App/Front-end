import { Employee } from "types/Employee";

const initialState: {
	auth?: string;
	loading: boolean;
	isAuthenticated: boolean;
	error?: Error;
	employee?: Employee;
} = {
	isAuthenticated: false,
	loading: false,
};

export const authReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// ME

		case "@me/auth/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@me/auth/success": {
			return {
				...state,
				loading: false,
				error: null,
				employee: payload,
			};
		}

		case "@me/auth/failed": {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}

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
				auth: payload,
				isAuthenticated: false,
			};
		}

		default: {
			return { ...state };
		}
	}
};
