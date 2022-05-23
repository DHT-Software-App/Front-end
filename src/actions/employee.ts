import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_employees_request = (token: string) => ({
	type: "@get/employees/request",
	payload: {
		token,
	},
});

export const get_employees_success = (employees: Employee[]) => ({
	type: "@get/employees/success",
	payload: {
		employees,
	},
});

export const get_employees_failure = (error: any) => ({
	type: "@get/employees/failure",
	payload: {
		error,
	},
});

// GET ONE
export const get_employee_request = (id: number) => ({
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

export const get_employee_failed = (error: Error) => ({
	type: "@get/employee/success",
	payload: {
		error,
	},
});

// CREATE
export const create_employee_request = (
	employee: Employee,
	roleName: string,
	token: string
) => ({
	type: "@create/employee/request",
	payload: {
		employee,
		token,
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

export const create_employee_failure = (error: any) => ({
	type: "@create/employee/failure",
	payload: {
		error,
	},
});

// UPDATE
export const update_employee_request = (
	employee: Employee,
	roleName: string,
	token: string
) => ({
	type: "@update/employee/request",
	payload: {
		employee,
		roleName,
		token,
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

export const update_employee_failure = (error: any) => ({
	type: "@update/employee/failure",
	payload: {
		error,
	},
});

// DELETE
export const delete_employee_request = (id: number, token: string) => ({
	type: "@delete/employee/request",
	payload: {
		id,
		token,
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

export const delete_employee_failure = (error: any) => ({
	type: "@delete/employee/failure",
	payload: {
		error,
	},
});
