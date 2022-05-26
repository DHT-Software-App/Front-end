import { signout_auth_request, sign_auth_request } from "actions/auth";
import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "types/Employee";
import { User } from "types/User";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

type AuthProps = {
	isAuthenticated: boolean;
	loading: boolean;
	auth: string;
	errors: Error[];
	success: SuccessResponse;
	employee: Employee;
};

export const useAuth = () => {
	const {
		isAuthenticated,
		loading,
		auth,
		errors,
		success,
		employee,
	}: AuthProps = useSelector(({ auth }: any) => auth);

	const dispatch = useDispatch();

	const sign = (user: User) => {
		dispatch(sign_auth_request(user));
	};

	const signout = () => {
		dispatch(signout_auth_request(auth));
	};

	useEffect(() => {
		if (auth && isExpired(auth)) {
			signout();
		}
	}, [auth]);

	return {
		isAuthenticated,
		loading,
		auth,
		errors,
		sign,
		signout,
		success,
		employee,
	};
};
