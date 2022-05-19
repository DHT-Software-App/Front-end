import { call, put, takeEvery } from "redux-saga/effects";
import {
	me_auth_success,
	sign_auth_failure,
	sign_auth_success,
} from "actions/auth";
import { AuthService } from "services/AuthService";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import { syncAuthStore } from "utils/auth/syncAuthStore";

function* me(action: any): any {
	try {
		const { payload: token } = action;

		const employee = yield call(AuthService.me, token);

		yield put(me_auth_success(employee));
	} catch (error) {
		console.log(error);
	}
}

function* sign(action: any) {
	try {
		const { payload } = action;

		const { token, maxAge } = yield call(AuthService.sign, payload);

		// store token in cookie, with specified max-age
		syncAuthStore(token, maxAge);

		yield put(sign_auth_success(token));
	} catch (error) {
		if (error instanceof InvalidAttributeError) {
			yield put(sign_auth_failure(error));
		}
	}
}

export function* authSaga() {
	yield takeEvery("@me/auth/request", me);
	yield takeEvery("@sign/auth/request", sign);
}
