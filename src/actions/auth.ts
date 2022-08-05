import { User } from "types/User";
import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// ME
export const me_auth_request = (access_token: string) => ({
	type: "@me/auth/request",
	payload: {
		access_token,
	},
});

export const me_auth_success = (employee: Employee) => ({
	type: "@me/auth/success",
	payload: {
		employee,
	},
});

export const me_auth_failure = (errors: Error[]) => ({
	type: "@me/auth/failure",
	payload: {
		errors,
	},
});

// SIGN
export const sign_auth_request = (user: User) => ({
	type: "@sign/auth/request",
	payload: {
		user,
	},
});

export const sign_auth_success = (
	access_token: string,
	success?: SuccessResponse
) => ({
	type: "@sign/auth/success",
	payload: {
		access_token,
		success,
	},
});

export const sign_auth_failure = (errors: Error[]) => ({
	type: "@sign/auth/failure",
	payload: {
		errors,
	},
});

// register
export const register_auth_request = (
	owner: Employee,
	access_token: string
) => ({
	type: "@register/auth/request",
	payload: {
		owner,
		access_token,
	},
});

export const register_auth_success = (success?: SuccessResponse) => ({
	type: "@register/auth/success",
	payload: {
		success,
	},
});

export const register_auth_failure = (errors: Error[]) => ({
	type: "@register/auth/failure",
	payload: { errors },
});

// signout
export const signout_auth_request = (access_token: string) => ({
	type: "@signout/auth/request",
	payload: {
		access_token,
	},
});

export const signout_auth_success = (success?: SuccessResponse) => ({
	type: "@signout/auth/success",
	payload: {
		success,
	},
});

export const signout_auth_failure = (errors: Error[]) => ({
	type: "@signout/auth/failure",
	payload: { errors },
});

// resend pin
export const resend_pin_request = (email: string) => ({
	type: "@resend/pin/request",
	payload: {
		email,
	},
});

export const resend_pin_success = (success: SuccessResponse) => ({
	type: "@resend/pin/success",
	payload: {
		success,
	},
});

export const resend_pin_failure = (errors: Error[]) => ({
	type: "@resend/pin/failure",
	payload: {
		errors,
	},
});

// verify pin
export const verify_pin_request = (email_token: string) => ({
	type: "@verify/pin/request",
	payload: {
		email_token,
	},
});

export const verify_pin_success = (success: SuccessResponse) => ({
	type: "@verify/pin/success",
	payload: {
		success,
	},
});

export const verify_pin_failure = (errors: Error[]) => ({
	type: "@verify/pin/failure",
	payload: {
		errors,
	},
});

// verify email
export const verify_email_request = (email_token: string) => ({
	type: "@verify/email/request",
	payload: {
		email_token,
	},
});

export const verify_email_success = (success: SuccessResponse) => ({
	type: "@verify/email/success",
	payload: {
		success,
	},
});

export const verify_email_failure = (errors: Error[]) => ({
	type: "@verify/email/failure",
	payload: {
		errors,
	},
});

// forgot password
export const forgot_password_request = (user: User) => ({
	type: "@forgot/password/request",
	payload: {
		user,
	},
});

export const forgot_password_success = (success: SuccessResponse) => ({
	type: "@forgot/password/success",
	payload: {
		success,
	},
});

export const forgot_password_failure = (errors: Error[]) => ({
	type: "@forgot/password/failure",
	payload: {
		errors,
	},
});

// reset
export const reset_password_request = (user: User) => ({
	type: "@reset/password/request",
	payload: {
		user,
	},
});

export const reset_password_success = (user: User) => ({
	type: "@reset/password/success",
	payload: user,
});

export const reset_password_failure = (errors: Error[]) => ({
	type: "@reset/password/failure",
	payload: errors,
});

export const exists_user_request = (email: string) => ({
	type: "@exists/user/request",
	payload: email,
});

export const exists_user_success = (confirmation: boolean) => ({
	type: "@exists/user/success",
	payload: confirmation,
});

export const exists_user_failure = (errors: Error[]) => ({
	type: "@exists/user/failure",
	payload: errors,
});

// clean
export const clear_auth_errors = () => ({
	type: "@clear/auth/errors",
});

export const clear_auth_success = () => ({
	type: "@clear/auth/success",
});