import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_employee_success,
	update_employee_success,
	delete_employee_success,
	get_employees_success,
	create_employee_failure,
} from "actions/employee";
import { Employee } from "types/Employee";
import { EmployeeService } from "services/EmployeeService";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import { register_auth_request } from "actions/auth";

function* getAll(action: any): any {
	try {
		const { payload: token } = action;
		const employees: Employee[] = yield call(EmployeeService.getAll, token);

		yield put(get_employees_success(employees));
	} catch (error) {}
}
function* create(action: any): any {
	try {
		const { employee: newEmployee, roleName, token } = action.payload;

		const employee: Employee = yield call(
			EmployeeService.create,
			newEmployee,
			roleName,
			token
		);

		yield put(
			create_employee_success(employee, {
				message: "Employee created successfully",
				success: true,
			})
		);

		// To create employee's user
		yield put(register_auth_request(employee, token));
	} catch (errors) {
		if (Array.isArray(errors)) {
			if (errors.every((er) => er instanceof InvalidAttributeError)) {
				yield put(create_employee_failure(errors));
			}
		}
	}
}

function* update(action: any): any {
	try {
		const { payload } = action;

		const employee: Employee = yield call(EmployeeService.update, payload);

		yield put(update_employee_success(employee));
	} catch (error) {}
}

function* remove(action: any): any {
	try {
		const { payload } = action;

		const id: number = yield call(EmployeeService.delete, payload);

		yield put(delete_employee_success(id));
	} catch (error) {}
}

export function* employeeSaga() {
	yield takeEvery("@get/employees/request", getAll);
	yield takeEvery("@create/employee/request", create);
	yield takeEvery("@update/employee/request", update);
	yield takeEvery("@delete/employee/request", remove);
}
