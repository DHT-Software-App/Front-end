import { User } from "types/User";
import { Employee } from "types/Employee";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// ME
export const me_auth_request = (token: string) => ({
	type: "@me/auth/request",
	payload: {
		token,
	},
});

export const me_auth_success = (employee: Employee) => ({
	type: "@me/auth/success",
	payload: {
		employee,
	},
});

export const me_auth_failure = (error: Error) => ({
	type: "@me/auth/failure",
	payload: {
		error,
	},
});

// SIGN
export const sign_auth_request = (user: User) => ({
	type: "@sign/auth/request",
	payload: {
		user,
	},
});

export const sign_auth_success = (token: string) => ({
	type: "@sign/auth/success",
	payload: {
		token,
	},
});

export const sign_auth_failure = (error: any) => ({
	type: "@sign/auth/failure",
	payload: {
		error,
	},
});

export const clean_auth = () => ({
	type: "@clean/auth",
});

// register
export const register_auth_request = (owner: Employee, token: string) => ({
	type: "@register/auth/request",
	payload: {
		owner,
		token,
	},
});

export const register_auth_success = (success?: SuccessResponse) => ({
	type: "@register/auth/success",
	payload: {
		success,
	},
});

export const register_auth_failure = (error: any) => ({
	type: "@register/auth/failure",
	payload: { error },
});

// signout
export const signout_auth_request = () => ({
	type: "@signout/auth/request",
	payload: {
		auth: null,
	},
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

export const resend_pin_failure = (error: any) => ({
	type: "@resend/pin/failure",
	payload: {
		error,
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

export const verify_pin_failure = (error: any) => ({
	type: "@verify/pin/failure",
	payload: {
		error,
	},
});

// verify email
export const verify_email_request = (user: User, email_token: string) => ({
	type: "@verify/email/request",
	payload: {
		email_token,
		user,
	},
});

export const verify_email_success = (success: SuccessResponse) => ({
	type: "@verify/email/success",
	payload: {
		success,
	},
});

export const verify_email_failure = (error: any) => ({
	type: "@verify/email/failure",
	payload: {
		error,
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

export const reset_password_failure = (error: any) => ({
	type: "@reset/password/failure",
	payload: error,
});

export const exists_user_request = (email: string) => ({
	type: "@exists/user/request",
	payload: email,
});

export const exists_user_success = (confirmation: boolean) => ({
	type: "@exists/user/success",
	payload: confirmation,
});

export const exists_user_failure = (error: any) => ({
	type: "@exists/user/failure",
	payload: error,
});
