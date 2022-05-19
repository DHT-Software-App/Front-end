import { User } from "types/User";
import { Employee } from "types/Employee";

// ME
export const me_auth_request = (token: string) => ({
	type: "@me/auth/request",
	payload: token,
});

export const me_auth_success = (employee: Employee) => ({
	type: "@me/auth/success",
	payload: employee,
});

export const me_auth_failure = (error: Error) => ({
	type: "@me/auth/failure",
	payload: error,
});

// SIGN
export const sign_auth_request = (user: User) => ({
	type: "@sign/auth/request",
	payload: user,
});

export const sign_auth_success = (token: string) => ({
	type: "@sign/auth/success",
	payload: token,
});

export const sign_auth_failure = (error: Error) => ({
	type: "@sign/auth/failure",
	payload: error,
});

export const sign_clean_errors = () => ({
	type: "@sign/clean/errors",
});

export const signout_auth_request = () => ({
	type: "@signout/auth/request",
	payload: null,
});
