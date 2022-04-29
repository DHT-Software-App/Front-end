import { Account } from "types/Account";

// SIGN
export const sign_auth_request = (account: Account) => ({
	type: "@sign/auth/request",
	payload: account,
});

export const sign_auth_success = (account: Account) => ({
	type: "@sign/auth/success",
	payload: account,
});

export const sign_auth_failure = (error: any) => ({
	type: "@sign/auth/failure",
	payload: error,
});

export const sign_clean_errors = () => ({
	type: "@sign/clean/errors",
});

export const signout_auth_request = () => ({
	type: "@signout/auth/request",
});
