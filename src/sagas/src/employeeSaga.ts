import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_employee_success,
	update_employee_success,
	delete_employee_success,
	get_employees_success,
	create_employee_failure,
	delete_employee_failure,
	get_employees_failure,
} from "actions/employee";
import { Employee } from "types/Employee";
import { EmployeeService } from "services/EmployeeService";
import { register_auth_request } from "actions/auth";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { EmployeeEnum } from "enum/EmployeeEnum";

function* getAll(action: any): any {
	try {
		const { access_token, queryParams } = action.payload;
		const {employees, meta}= yield call(
			EmployeeService.getAll,
			access_token,
			queryParams
		);

		yield put(get_employees_success(employees, meta));
	} catch (errors) {
		yield put(get_employees_failure(errors as Error[]));
	}
}

function* create(action: any): any {
	try {
		const { employee, roleName, access_token } = action.payload;

		const newEmployee: Employee = yield call(
			EmployeeService.create,
			employee,
			roleName,
			access_token
		);
		
		const message: SuccessResponse = {
			message: "Employee created successfully",
			success: true,
			code: EmployeeEnum.CREATED,
		};

		yield put(create_employee_success(newEmployee, message));

		//To create employee's user
		yield put(register_auth_request(newEmployee, access_token));
	} catch (errors) {
		yield put(create_employee_failure(errors as Error[]));
	}
}

function* update(action: any): any {
	try {
		const { employee, roleName, access_token } = action.payload;

		const updated_employee: Employee = yield call(
			EmployeeService.update,
			employee,
			roleName,
			access_token
		);

		const message: SuccessResponse = {
			message: "Employee updated successfully.",
			success: true,
			code: EmployeeEnum.UPDATED,
		};

		yield put(update_employee_success(updated_employee, message));
	} catch (errors) {
		yield put(create_employee_failure(errors as Error[]));
	}
}

function* remove(action: any): any {
	try {
		const { id, access_token } = action.payload;

		const success: SuccessResponse = yield call(
			EmployeeService.delete,
			id,
			access_token
		);

		yield put(delete_employee_success(id, success));
	} catch (errors) {
		yield put(delete_employee_failure(errors as Error[]));
	}
}

export function* employeeSaga() {
	yield takeEvery("@get/employees/request", getAll);
	yield takeEvery("@create/employee/request", create);
	yield takeEvery("@update/employee/request", update);
	yield takeEvery("@delete/employee/request", remove);
}