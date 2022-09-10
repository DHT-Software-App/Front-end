import { WorkType } from "types/WorkType";

const initialState: {
	work_types: WorkType[];
	loading: boolean;
	errors?: Error[];
} = {
	work_types: [],
	loading: false,
};


export const workTypeReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => { 

  const { type, payload } = action;

	switch (type) {
    // GET ALL
		case "@get/work_types/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/work_types/success": {
			const { work_types } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				work_types,
			};
		}

		case "@get/work_types/failure": {
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
}