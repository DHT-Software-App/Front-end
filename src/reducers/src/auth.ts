import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	auth?: string;
	loading?: boolean;
	isAuthenticated?: boolean;
	employee?: Employee;
	errors?: Error[];
	success?: SuccessResponse;
} = {};

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
			const { employee, success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				employee,
				success,
			};
		}

		case "@me/auth/failed": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
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
			const { access_token, success } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				success,
				auth: access_token,
				isAuthenticated: true,
			};
		}

		case "@sign/auth/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// register
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
				errors: null,
				success,
			};
		}

		case "@register/auth/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// resend pin
		case "@resend/pin/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@resend/pin/success": {
			const { success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				success,
			};
		}

		case "@resend/pin/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// verify pin
		case "@verify/pin/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@verify/pin/success": {
			const { success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				success,
			};
		}

		case "@verify/pin/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// verify email
		case "@verify/email/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@verify/email/success": {
			const { success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				success,
			};
		}

		case "@verify/email/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// signout
		case "@signout/auth/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@signout/auth/success": {
			const { success } = payload;

			return {
				...state,
				auth: null,
				loading: false,
				errors: null,
				isAuthenticated: false,
				success,
			};
		}

		case "@signout/auth/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean state
		case "@clear/auth/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/auth/success": {
			return {
				...state,
				success: null,
			};
		}

		// forgot password
		case "@forgot/password/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@forgot/password/success": {
			const { success } = payload;
			return {
				...state,
				loading: false,
				success,
			};
		}

		case "@forgot/password/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		default: {
			return { ...state };
		}
	}
};