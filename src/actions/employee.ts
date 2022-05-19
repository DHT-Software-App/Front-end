import { Employee } from "types/Employee";

// GET ALL
export const get_employees_request = (token: string) => ({
	type: "@get/employees/request",
	payload: token,
});

export const get_employees_success = (employees: Employee[]) => ({
	type: "@get/employees/success",
	payload: employees,
});

export const get_employees_failure = (error: any) => ({
	type: "@get/employees/failure",
	payload: error,
});

// GET ONE
export const get_employee_request = (id: number) => ({
	type: "@get/employee/request",
});

export const get_employee_success = (employee: Employee) => ({
	type: "@get/employee/success",
	payload: employee,
});

export const get_employee_failed = (error: Error) => ({
	type: "@get/employee/success",
	payload: error,
});

// CREATE
export const create_employee_request = (employee: Employee) => ({
	type: "@create/employee/request",
	payload: employee,
});

export const create_employee_success = (employee: Employee) => ({
	type: "@create/employee/success",
	payload: employee,
});

export const create_employee_failure = (error: any) => ({
	type: "@create/employee/failure",
	payload: error,
});

// UPDATE
export const update_employee_request = (employee: Employee) => ({
	type: "@update/employee/request",
	payload: employee,
});

export const update_employee_success = (employee: Employee) => ({
	type: "@update/employee/success",
	payload: employee,
});

export const update_employee_failure = (error: any) => ({
	type: "@update/employee/failure",
	payload: error,
});

// DELETE
export const delete_employee_request = (id: number) => ({
	type: "@delete/employee/request",
	payload: id,
});

export const delete_employee_success = (id: number) => ({
	type: "@delete/employee/success",
	payload: id,
});

export const delete_employee_failure = (error: any) => ({
	type: "@delete/employee/failure",
	payload: error,
});
