import { EstimateItem } from "types/EstimateItem";
import { MetaResponse } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	estimate_items: EstimateItem[];
	authenticated?: EstimateItem;
	loading: boolean;
	errors?: Error[];
	success?: SuccessResponse;
	meta: MetaResponse;
} = {
	estimate_items: [],
	loading: false,
	meta: {}
};

export const estimateItemReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// GET ALL
		case "@get/estimate_items/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/estimate_items/success": {
			const { estimate_items, meta } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				estimate_items,
				meta
			};
		}

		case "@get/estimate_items/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// GET ONE
		case "@get/estimate_item/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/estimate_item/success": {
			const { estimate_item } = payload;

			return {
				...state,
				loading: false,
				errors: null,
			};
		}

		case "@get/estimate_item/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// CREATE
		case "@create/estimate_item/request": {
			return { ...state, loading: true };
		}

		case "@create/estimate_item/success": {
			const { success, estimate_item } = payload;
	
			return {
				...state,
				loading: false,
				errors: null,
				estimate_items: [...state.estimate_items, estimate_item],
				success,
			};
		}

		case "@create/estimate_item/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// UPDATE
		case "@update/estimate_item/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@update/estimate_item/success": {
			const { estimate_item: updated_estimate_item, success } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				estimate_items: state.estimate_items.map((estimate_item) =>
					estimate_item.id == updated_estimate_item.id ? updated_estimate_item : estimate_item
				),
				success,
			};
		}

		case "@update/estimate_item/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// DELETE
		case "@delete/estimate_item/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@delete/estimate_item/success": {
			const { id, success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				estimate_items: state.estimate_items.filter((estimate_item) => estimate_item.id !== id),
				success,
			};
		}

		case "@delete/estimate_item/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean

		case "@clear/estimate_item/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/estimate_item/success": {
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