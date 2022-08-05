import { call, put, takeEvery } from "redux-saga/effects";
import {
	forgot_password_failure,
	forgot_password_success,
	me_auth_failure,
	me_auth_success,
	register_auth_failure,
	register_auth_success,
	resend_pin_failure,
	resend_pin_success,
	signout_auth_failure,
	signout_auth_success,
	sign_auth_failure,
	sign_auth_success,
	verify_email_failure,
	verify_email_success,
	verify_pin_failure,
	verify_pin_success,
} from "actions/auth";
import { AuthService } from "services/AuthService";
import { syncAuthStore } from "utils/auth/syncAuthStore";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { User } from "types/User";
import { unsyncAuthStore } from "utils/auth/unsyncAuthStore";

function* me(action: any): any {
	try {
		const { access_token } = action.payload;

		const employee = yield call(AuthService.me, access_token);

		yield put(me_auth_success(employee));
	} catch (errors) {
		yield put(me_auth_failure(errors as Error[]));
	}
}

function* sign(action: any) {
	try {
		const { user } = action.payload;

		const { access_token, maxAge, success } = yield call(
			AuthService.sign,
			user
		);

		// store token in cookie, with specified max-age
		syncAuthStore(access_token, maxAge);

		yield put(sign_auth_success(access_token, success));
	} catch (errors) {
		yield put(sign_auth_failure(errors as Error[]));
	}
}

function* signout(action: any): any {
	try {
		const { access_token } = action.payload;

		const success = yield call(AuthService.signout, access_token);

		// remove cookies from browser
		unsyncAuthStore();

		yield put(signout_auth_success(success));
	} catch (errors) {
		yield put(signout_auth_failure(errors as Error[]));
	}
}

function* register(action: any): any {
	try {
		const { owner, access_token } = action.payload;

		console.log(owner);
		const success: SuccessResponse = yield call(
			AuthService.register,
			owner,
			access_token
		);

		yield put(register_auth_success(success));
	} catch (errors) {
		yield put(register_auth_failure(errors as Error[]));
	}
}

function* resendPin(action: any) {
	try {
		const { email } = action.payload;

		const success: SuccessResponse = yield call(AuthService.resend, email);

		yield put(resend_pin_success(success));
	} catch (errors) {
		yield put(resend_pin_failure(errors as Error[]));
	}
}

function* verifyPin(action: any) {
	try {
		const { email_token } = action.payload;

		const success: SuccessResponse = yield call(
			AuthService.verifyPin,
			email_token
		);

		yield put(verify_pin_success(success));
	} catch (errors) {
		yield put(verify_pin_failure(errors as Error[]));
	}
}

function* verifyEmail(action: any) {
	try {
		const {
			email_token,
		}: {
			email_token: string;
			user: User;
		} = action.payload;

		const success: SuccessResponse = yield call(
			AuthService.verifyEmail,
			email_token
		);

		yield put(verify_email_success(success));
	} catch (errors) {
		yield put(verify_email_failure(errors as Error[]));
	}
}

function* forgotPassword(action: any) {
	try {
		const {
			user,
		}: {
			user: User;
		} = action.payload;

		const success: SuccessResponse = yield call(
			AuthService.forgetPassword,
			user
		);

		yield put(forgot_password_success(success));
	} catch (errors) {
		yield put(forgot_password_failure(errors as Error[]));
	}
}

export function* authSaga() {
	yield takeEvery("@me/auth/request", me);
	yield takeEvery("@sign/auth/request", sign);
	yield takeEvery("@signout/auth/request", signout);
	yield takeEvery("@register/auth/request", register);
	yield takeEvery("@resend/pin/request", resendPin);
	yield takeEvery("@verify/pin/request", verifyPin);
	yield takeEvery("@verify/email/request", verifyEmail);
	yield takeEvery("@forgot/password/request", forgotPassword);
}