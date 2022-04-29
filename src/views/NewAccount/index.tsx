import { AccountForm } from "components/AccountForm";
import { Account } from "types/Account";
import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	create_account_request,
	exists_account_request,
} from "actions/account";

export const NewAccountView = () => {
	const dispatch = useDispatch();
	const { loading, existingAccount } = useSelector(
		({ account }: any) => account
	);

	const { token } = useParams();
	const navigate = useNavigate();
	const [account, setAccount] = useState<Account>();
	const { decodedToken, isExpired } = useJwt(token!);

	useEffect(() => {
		if (decodedToken && !isExpired) {
			const { email_address } = decodedToken as any;

			setAccount({
				email_address,
				password: "",
				confirm_password: "",
			} as Account);

			// we need to verify that account does not exist on backend
			// ................
			dispatch(exists_account_request(email_address));
		} else if (isExpired) {
			navigate("/");
		}
	}, [decodedToken, isExpired]);

	useEffect(() => {
		if (existingAccount) {
			// should be redirect to the existing account page
			navigate("/");
		}
	}, [existingAccount]);

	const handleOnSubmit = (account: Account) => {
		dispatch(create_account_request(account));
	};

	const handleOnSuccess = () => {
		// should be redirect to the existing account page
		navigate("/");
	};

	return (
		<div className="NewPassword">
			{existingAccount == null ? (
				<h4>Loading...</h4>
			) : (
				<AccountForm
					initialValue={account!}
					submit={handleOnSubmit}
					success={handleOnSuccess}
				/>
			)}
		</div>
	);
};
