const initialState: {
	loading: boolean;
	existingUser?: boolean;
	error?: any;
} = {
	loading: false,
};

export const userReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// CREATE
		case "@create/user/request": {
			return {
				...state,
				loading: true,
				error: null,
			};
		}

		case "@create/user/success": {
			return {
				...state,
				loading: false,
				error: null,
				user: payload,
			};
		}

		case "@create/user/failure": {
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
				user: payload,
			};
		}

		case "@reset/user/failure": {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}

		// EXISTS USER
		case "@exists/user/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@exists/user/success": {
			return {
				...state,
				loading: false,
				error: null,
				existinguser: payload,
			};
		}

		case "@exists/user/failure": {
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