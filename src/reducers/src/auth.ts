import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	auth?: string;
	loading: boolean;
	isAuthenticated: boolean;
	error?: any;
	employee?: Employee;
	success?: SuccessResponse;
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
			const { employee } = payload;

			return {
				...state,
				loading: false,
				error: null,
				employee,
			};
		}

		case "@me/auth/failed": {
			const { error } = payload;

			return {
				...state,
				loading: false,
				error,
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
			const { token } = payload;
			return {
				...state,
				loading: false,
				error: null,
				auth: token,
				isAuthenticated: true,
			};
		}

		case "@sign/auth/failure": {
			const { error } = payload;

			return {
				...state,
				loading: false,
				error,
			};
		}

		case "@register/auth/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@register/auth/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@register/auth/success": {
			const { success } = payload;

			return {
				...state,
				loading: false,
				error: null,
				success,
			};
		}

		case "@register/auth/failure": {
			const { error } = payload;

			return {
				...state,
				loading: false,
				error,
			};
		}

		case "@sign/clean/errors": {
			return {
				...state,
				error: null,
			};
		}

		case "@signout/auth/request": {
			const { auth } = payload;

			return {
				...state,
				auth,
				isAuthenticated: false,
			};
		}

		default: {
			return { ...state };
		}
	}
};
