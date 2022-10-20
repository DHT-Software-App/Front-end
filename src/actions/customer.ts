import { Customer } from "types/Customer";
import { MetaResponse, RequestQueryParams } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_customers_request = (access_token: string, queryParams: RequestQueryParams<Customer> = {}) => ({
	type: "@get/customers/request",
	payload: {
		access_token,
		queryParams
	},
});

export const get_customers_success = (customers: Customer[], meta: MetaResponse = {}) => ({
	type: "@get/customers/success",
	payload: {
		customers,
		meta
	},
});

export const get_customers_failure = (errors: Error[]) => ({
	type: "@get/customers/failure",
	payload: {
		errors,
	},
});

// GET ONE
export const get_customer_request = (id: number, access_token: string) => ({
	type: "@get/customer/request",
	payload: {
		id,
	},
});

export const get_customer_success = (customer: Customer) => ({
	type: "@get/customer/success",
	payload: {
		customer,
	},
});

export const get_customer_failed = (errors: Error[]) => ({
	type: "@get/customer/success",
	payload: {
		errors,
	},
});

// CREATE
export const create_customer_request = (
	customer: Customer,
	access_token: string
) => ({
	type: "@create/customer/request",
	payload: {
		customer,
		access_token,
	},
});

export const create_customer_success = (
	customer: Customer,
	success?: SuccessResponse
) => ({
	type: "@create/customer/success",
	payload: {
		customer,
		success,
	},
});

export const create_customer_failure = (errors: Error[]) => ({
	type: "@create/customer/failure",
	payload: {
		errors,
	},
});

// UPDATE
export const update_customer_request = (
	customer: Customer,
	access_token: string
) => ({
	type: "@update/customer/request",
	payload: {
		customer,
		access_token,
	},
});

export const update_customer_success = (
	customer: Customer,
	success?: SuccessResponse
) => ({
	type: "@update/customer/success",
	payload: {
		customer,
		success,
	},
});

export const update_customer_failure = (errors: Error[]) => ({
	type: "@update/customer/failure",
	payload: {
		errors,
	},
});

// DELETE
export const delete_customer_request = (id: number, access_token: string) => ({
	type: "@delete/customer/request",
	payload: {
		id,
		access_token,
	},
});

export const delete_customer_success = (
	id: number,
	success?: SuccessResponse
) => ({
	type: "@delete/customer/success",
	payload: {
		success,
		id,
	},
});

export const delete_customer_failure = (errors: Error[]) => ({
	type: "@delete/customer/failure",
	payload: {
		errors,
	},
});

// Clean actions
export const clear_customer_errors = () => ({
	type: "@clear/customer/errors",
});

export const clear_customer_success = () => ({
	type: "@clear/customer/success",
});