import {
	create_account_success,
	exists_account_success,
	reset_password_success,
} from "actions/account";
import { call, put, takeEvery } from "redux-saga/effects";
import { AccountService } from "services/AccountService";
import { Account } from "types/Account";

function* create(action: any): any {
	try {
		const { payload } = action;
		const account: Account = yield call(AccountService.create, payload);

		yield put(create_account_success(account));
	} catch (error) {}
}

function* resetPassword(action: any): any {
	try {
		const { payload } = action;
		const account: Account = yield call(AccountService.update, payload);

		yield put(reset_password_success(account));
	} catch (error) {}
}

function* exists(action: any): any {
	try {
		const { payload } = action;
		const confirmation: boolean = yield call(AccountService.exists, payload);

		yield put(exists_account_success(confirmation));
	} catch (error) {}
}
export function* accountSaga() {
	yield takeEvery("@create/account/request", create);
	yield takeEvery("@update/account/request", resetPassword);
}
