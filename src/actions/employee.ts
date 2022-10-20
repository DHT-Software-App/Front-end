import { Employee } from "types/Employee";
import { MetaResponse, RequestQueryParams } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_employees_request = (access_token: string, queryParams: RequestQueryParams<Employee> = {}) => ({
	type: "@get/employees/request",
	payload: {
		access_token,
		queryParams
	},
});

export const get_employees_success = (employees: Employee[], meta: MetaResponse = {}) => ({
	type: "@get/employees/success",
	payload: {
		employees,
		meta
	},
});

export const get_employees_failure = (errors: Error[]) => ({
	type: "@get/employees/failure",
	payload: {
		errors,
	},
});

// GET ONE
export const get_employee_request = (id: number, access_token: string) => ({
	type: "@get/employee/request",
	payload: {
		id,
	},
});

export const get_employee_success = (employee: Employee) => ({
	type: "@get/employee/success",
	payload: {
		employee,
	},
});

export const get_employee_failed = (errors: Error[]) => ({
	type: "@get/employee/success",
	payload: {
		errors,
	},
});

// CREATE
export const create_employee_request = (
	employee: Employee,
	roleName: string,
	access_token: string
) => ({
	type: "@create/employee/request",
	payload: {
		employee,
		access_token,
		roleName,
	},
});

export const create_employee_success = (
	employee: Employee,
	success?: SuccessResponse
) => ({
	type: "@create/employee/success",
	payload: {
		employee,
		success,
	},
});

export const create_employee_failure = (errors: Error[]) => ({
	type: "@create/employee/failure",
	payload: {
		errors,
	},
});

// UPDATE
export const update_employee_request = (
	employee: Employee,
	roleName: string,
	access_token: string
) => ({
	type: "@update/employee/request",
	payload: {
		employee,
		roleName,
		access_token,
	},
});

export const update_employee_success = (
	employee: Employee,
	success?: SuccessResponse
) => ({
	type: "@update/employee/success",
	payload: {
		employee,
		success,
	},
});

export const update_employee_failure = (errors: Error[]) => ({
	type: "@update/employee/failure",
	payload: {
		errors,
	},
});

// DELETE
export const delete_employee_request = (id: number, access_token: string) => ({
	type: "@delete/employee/request",
	payload: {
		id,
		access_token,
	},
});

export const delete_employee_success = (
	id: number,
	success?: SuccessResponse
) => ({
	type: "@delete/employee/success",
	payload: {
		success,
		id,
	},
});

export const delete_employee_failure = (errors: Error[]) => ({
	type: "@delete/employee/failure",
	payload: {
		errors,
	},
});

// Clean actions

export const clear_employee_errors = () => ({
	type: "@clear/employee/errors",
});

export const clear_employee_success = () => ({
	type: "@clear/employee/success",
});