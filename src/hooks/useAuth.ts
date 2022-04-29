import {
	signout_auth_request,
	sign_auth_request,
	sign_clean_errors,
} from "actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "types/Account";

export const useAuth = () => {
	const { isAuthenticated, loading, auth, errors } = useSelector(
		({ auth }: any) => auth
	);
	const dispatch = useDispatch();

	const sign = (account: Account) => {
		dispatch(sign_auth_request(account));
	};

	const signout = () => {
		dispatch(signout_auth_request());
	};

	const cleanErrors = () => {
		dispatch(sign_clean_errors());
	};

	return {
		isAuthenticated,
		loading,
		auth,
		errors,
		sign,
		signout,
		cleanErrors,
	};
};
