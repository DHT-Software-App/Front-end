import { Client } from "types/Client";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_clients_request = (access_token: string) => ({
	type: "@get/clients/request",
	payload: {
		access_token,
	},
});

export const get_clients_success = (clients: Client[]) => ({
	type: "@get/clients/success",
	payload: {
		clients,
	},
});

export const get_clients_failure = (errors: Error[]) => ({
	type: "@get/clients/failure",
	payload: {
		errors,
	},
});

// GET ONE
export const get_client_request = (id: number, access_token: string) => ({
	type: "@get/client/request",
	payload: {
		id,
	},
});

export const get_client_success = (client: Client) => ({
	type: "@get/client/success",
	payload: {
		client,
	},
});

export const get_client_failed = (errors: Error[]) => ({
	type: "@get/client/success",
	payload: {
		errors,
	},
});

// CREATE
export const create_client_request = (
	client: Client,
	access_token: string
) => ({
	type: "@create/client/request",
	payload: {
		client,
		access_token,
	},
});

export const create_client_success = (
	client: Client,
	success?: SuccessResponse
) => ({
	type: "@create/client/success",
	payload: {
		client,
		success,
	},
});

export const create_client_failure = (errors: Error[]) => ({
	type: "@create/client/failure",
	payload: {
		errors,
	},
});

// UPDATE
export const update_client_request = (
	client: Client,
	access_token: string
) => ({
	type: "@update/client/request",
	payload: {
		client,
		access_token,
	},
});

export const update_client_success = (
	client: Client,
	success?: SuccessResponse
) => ({
	type: "@update/client/success",
	payload: {
		client,
		success,
	},
});

export const update_client_failure = (errors: Error[]) => ({
	type: "@update/client/failure",
	payload: {
		errors,
	},
});

// DELETE
export const delete_client_request = (id: number, access_token: string) => ({
	type: "@delete/client/request",
	payload: {
		id,
		access_token,
	},
});

export const delete_client_success = (
	id: number,
	success?: SuccessResponse
) => ({
	type: "@delete/client/success",
	payload: {
		success,
		id,
	},
});

export const delete_client_failure = (errors: Error[]) => ({
	type: "@delete/client/failure",
	payload: {
		errors,
	},
});

// Clean actions
export const clear_client_errors = () => ({
	type: "@clear/client/errors",
});

export const clear_client_success = () => ({
	type: "@clear/client/success",
});