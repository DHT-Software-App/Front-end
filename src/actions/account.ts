import { Account } from "types/Account";

export const create_account_request = (account: Account) => ({
	type: "@create/account/request",
	payload: account,
});

export const create_account_success = (account: Account) => ({
	type: "@create/account/success",
	payload: account,
});

export const create_account_failure = (error: any) => ({
	type: "@create/account/failure",
	payload: error,
});

export const reset_password_request = (account: Account) => ({
	type: "@reset/password/request",
	payload: account,
});

export const reset_password_success = (account: Account) => ({
	type: "@reset/password/success",
	payload: account,
});

export const reset_password_failure = (error: any) => ({
	type: "@reset/password/failure",
	payload: error,
});

export const exists_account_request = (email: string) => ({
	type: "@exists/account/request",
	payload: email,
});

export const exists_account_success = (confirmation: boolean) => ({
	type: "@exists/account/success",
	payload: confirmation,
});

export const exists_account_failure = (error: any) => ({
	type: "@exists/account/failure",
	payload: error,
});
