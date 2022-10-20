import { EstimateItem } from "types/EstimateItem";
import { MetaResponse, RequestQueryParams } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_estimate_items_request = (access_token: string, queryParams: RequestQueryParams<EstimateItem> = {}) => ({
	type: "@get/estimate_items/request",
	payload: {
		access_token,
		queryParams
	},
});

export const get_estimate_items_success = (estimate_items: EstimateItem[], meta: MetaResponse = {}) => ({
	type: "@get/estimate_items/success",
	payload: {
		estimate_items,
		meta
	},
});

export const get_estimate_items_failure = (errors: Error[]) => ({
	type: "@get/estimate_items/failure",
	payload: {
		errors,
	},
});

// GET ONE
export const get_estimate_item_request = (id: number, access_token: string) => ({
	type: "@get/estimate_item/request",
	payload: {
		id,
	},
});

export const get_estimate_item_success = (estimate_item: EstimateItem) => ({
	type: "@get/estimate_item/success",
	payload: {
		estimate_item,
	},
});

export const get_estimate_item_failed = (errors: Error[]) => ({
	type: "@get/estimate_item/success",
	payload: {
		errors,
	},
});

// CREATE
export const create_estimate_item_request = (
	estimate_item: EstimateItem,
	access_token: string
) => ({
	type: "@create/estimate_item/request",
	payload: {
		estimate_item,
		access_token,
	},
});

export const create_estimate_item_success = (
	estimate_item: EstimateItem,
	success?: SuccessResponse
) => ({
	type: "@create/estimate_item/success",
	payload: {
		estimate_item,
		success,
	},
});

export const create_estimate_item_failure = (errors: Error[]) => ({
	type: "@create/estimate_item/failure",
	payload: {
		errors,
	},
});

// UPDATE
export const update_estimate_item_request = (
	estimate_item: EstimateItem,
	access_token: string
) => ({
	type: "@update/estimate_item/request",
	payload: {
		estimate_item,
		access_token,
	},
});

export const update_estimate_item_success = (
	estimate_item: EstimateItem,
	success?: SuccessResponse
) => ({
	type: "@update/estimate_item/success",
	payload: {
		estimate_item,
		success,
	},
});

export const update_estimate_item_failure = (errors: Error[]) => ({
	type: "@update/estimate_item/failure",
	payload: {
		errors,
	},
});

// DELETE
export const delete_estimate_item_request = (id: number, access_token: string) => ({
	type: "@delete/estimate_item/request",
	payload: {
		id,
		access_token,
	},
});

export const delete_estimate_item_success = (
	id: number,
	success?: SuccessResponse
) => ({
	type: "@delete/estimate_item/success",
	payload: {
		success,
		id,
	},
});

export const delete_estimate_item_failure = (errors: Error[]) => ({
	type: "@delete/estimate_item/failure",
	payload: {
		errors,
	},
});

// Clean actions
export const clear_estimate_item_errors = () => ({
	type: "@clear/estimate_item/errors",
});

export const clear_estimate_item_success = () => ({
	type: "@clear/estimate_item/success",
});