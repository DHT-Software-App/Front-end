import {
	signout_auth_request,
	sign_auth_request,
	clear_auth_errors,
	clear_auth_success,
} from "actions/auth";
import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { User } from "types/User";

export const useAuth = () => {
	const { isAuthenticated, loading, auth, error } = useSelector(
		({ auth }: any) => auth
	);

	const dispatch = useDispatch();

	const sign = (user: User) => {
		dispatch(sign_auth_request(user));
	};

	const signout = () => {
		dispatch(signout_auth_request());
	};

	const cleanErrors = () => {
		dispatch(clear_auth_errors());
		dispatch(clear_auth_success());
	};

	useEffect(() => {
		if (auth && isExpired(auth)) {
			signout();
		}
	});

	return {
		isAuthenticated,
		loading,
		auth,
		error,
		sign,
		signout,
		cleanErrors,
	};
};
