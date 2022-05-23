import { call, put, takeEvery } from "redux-saga/effects";
import {
	me_auth_success,
	register_auth_success,
	resend_pin_success,
	sign_auth_failure,
	sign_auth_success,
	verify_email_success,
	verify_pin_success,
} from "actions/auth";
import { AuthService } from "services/AuthService";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import { syncAuthStore } from "utils/auth/syncAuthStore";
import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { User } from "types/User";

function* me(action: any): any {
	try {
		const { token } = action.payload;

		const employee = yield call(AuthService.me, token);

		yield put(me_auth_success(employee));
	} catch (error) {
		console.log(error);
	}
}

function* sign(action: any) {
	try {
		const { user } = action.payload;

		const { token, maxAge } = yield call(AuthService.sign, user);

		// store token in cookie, with specified max-age
		syncAuthStore(token, maxAge);

		yield put(sign_auth_success(token));
	} catch (errors) {
		if (Array.isArray(errors)) {
			if (errors.every((er) => er instanceof InvalidAttributeError)) {
				yield put(sign_auth_failure(errors));
			}
		}
	}
}

function* register(action: any): any {
	try {
		const { owner, token }: { owner: Employee; token: string } = action.payload;

		console.log(owner);
		const success: SuccessResponse = yield call(
			AuthService.register,
			owner,
			token
		);

		yield put(register_auth_success(success));
	} catch (error) {}
}

function* resendPin(action: any) {
	try {
		const { email } = action.payload;

		const success: SuccessResponse = yield call(AuthService.resend, email);

		yield put(resend_pin_success(success));
	} catch (error) {}
}

function* verifyPin(action: any) {
	try {
		const { email_token } = action.payload;

		const success: SuccessResponse = yield call(
			AuthService.verifyPin,
			email_token
		);

		yield put(verify_pin_success(success));
	} catch (error) {}
}

function* verifyEmail(action: any) {
	try {
		const {
			email_token,
			user,
		}: {
			email_token: string;
			user: User;
		} = action.payload;

		const success: SuccessResponse = yield call(
			AuthService.verifyEmail,
			user,
			email_token
		);

		yield put(verify_email_success(success));
	} catch (error) {}
}

export function* authSaga() {
	yield takeEvery("@me/auth/request", me);
	yield takeEvery("@sign/auth/request", sign);
	yield takeEvery("@register/auth/request", register);
	yield takeEvery("@resend/pin/request", resendPin);
	yield takeEvery("@verify/pin/request", verifyPin);
	yield takeEvery("@verify/email/request", verifyEmail);
}
