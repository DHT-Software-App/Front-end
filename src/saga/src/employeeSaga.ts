import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_employee_success,
	update_employee_success,
	delete_employee_success,
	get_employee_success,
} from "actions/employee";
import { Employee } from "types/Employee";
import { EmployeeService } from "services/EmployeeService";

function* getAll(): any {
	try {
		const employees: Employee[] = yield call(EmployeeService.getAll);

		yield put(get_employee_success(employees));
	} catch (error) {}
}
function* create(action: any): any {
	try {
		const { payload } = action;

		const employee: Employee = yield call(EmployeeService.create, payload);

		yield put(create_employee_success(employee));
	} catch (error) {}
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
	yield takeEvery("@get/employee/request", getAll);
	yield takeEvery("@create/employee/request", create);
	yield takeEvery("@update/employee/request", update);
	yield takeEvery("@delete/employee/request", remove);
}
