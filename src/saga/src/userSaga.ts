import {
	create_user_success,
	exists_user_success,
	reset_password_success,
} from "actions/user";
import { call, put, takeEvery } from "redux-saga/effects";
import { UserService } from "services/UserService";
import { User } from "types/User";

function* create(action: any): any {
	try {
		const { payload } = action;
		const user: User = yield call(UserService.create, payload);

		yield put(create_user_success(user));
	} catch (error) {}
}

function* resetPassword(action: any): any {
	try {
		const { payload } = action;
		const user: User = yield call(UserService.update, payload);

		yield put(reset_password_success(user));
	} catch (error) {}
}

function* exists(action: any): any {
	try {
		const { payload } = action;
		const confirmation: boolean = yield call(UserService.exists, payload);

		yield put(exists_user_success(confirmation));
	} catch (error) {}
}

export function* userSaga() {
	yield takeEvery("@create/user/request", create);
	yield takeEvery("@update/user/request", resetPassword);
}
