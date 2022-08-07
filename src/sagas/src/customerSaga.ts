import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_customer_success,
	update_customer_success,
	delete_customer_success,
	get_customers_success,
	create_customer_failure,
	delete_customer_failure,
	get_customers_failure,
} from "actions/customer";
import { Customer } from "types/Customer";
import { CustomerService } from "services/CustomerService";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { CustomerEnum } from "enum/CustomerEnum";

function* getAll(action: any): any {
	try {
		const { access_token } = action.payload;
		const customers: Customer[] = yield call(
			CustomerService.getAll,
			access_token
		);

		yield put(get_customers_success(customers));
	} catch (errors) {
		yield put(get_customers_failure(errors as Error[]));
	}
}

function* create(action: any): any {
	try {
		const { customer, access_token } = action.payload;

		const new_customer: Customer = yield call(
			CustomerService.create,
			customer,
			access_token
		);

		const message: SuccessResponse = {
			message: "Customer created successfully",
			success: true,
			code: CustomerEnum.CREATED,
		};

		yield put(create_customer_success(new_customer, message));

	} catch (errors) {
		yield put(create_customer_failure(errors as Error[]));
	}
}

function* update(action: any): any {
	try {
		const { customer, access_token } = action.payload;

		const updated_customer: Customer = yield call(
			CustomerService.update,
			customer,
			access_token
		);

		const message: SuccessResponse = {
			message: "Customer updated successfully.",
			success: true,
			code: CustomerEnum.UPDATED,
		};

		yield put(update_customer_success(updated_customer, message));
	} catch (errors) {
		yield put(create_customer_failure(errors as Error[]));
	}
}

function* remove(action: any): any {
	try {
		const { id, access_token } = action.payload;

		const success: SuccessResponse = yield call(
			CustomerService.delete,
			id,
			access_token
		);

		yield put(delete_customer_success(id, success));
	} catch (errors) {
		yield put(delete_customer_failure(errors as Error[]));
	}
}

export function* customerSaga() {
	yield takeEvery("@get/customers/request", getAll);
	yield takeEvery("@create/customer/request", create);
	yield takeEvery("@update/customer/request", update);
	yield takeEvery("@delete/customer/request", remove);
}