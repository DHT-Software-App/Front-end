import { call, put, takeEvery } from "redux-saga/effects";
import { sign_auth_success } from "actions/auth";
import { Account } from "types/Account";
import { AuthService } from "services/AuthService";

function* sign(action: any) {
	try {
		const { payload } = action;

		const account: Account = yield call(AuthService.sign, payload);

		yield put(sign_auth_success(account));
	} catch (error) {}
}

export function* authSaga() {
	yield takeEvery("@sign/auth/request", sign);
}
