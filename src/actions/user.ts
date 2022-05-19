import { User } from "types/User";

export const create_user_request = (user: User) => ({
	type: "@create/user/request",
	payload: user,
});

export const create_user_success = (user: User) => ({
	type: "@create/user/success",
	payload: user,
});

export const create_user_failure = (error: any) => ({
	type: "@create/user/failure",
	payload: error,
});

export const reset_password_request = (user: User) => ({
	type: "@reset/password/request",
	payload: user,
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
