import { UserForm } from "components/UserForm";
import { User } from "types/User";
import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { create_user_request, exists_user_request } from "actions/user";

export const NewUserView = () => {
	const dispatch = useDispatch();
	const { loading, existingUser } = useSelector(({ user }: any) => user);

	const { token } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState<User>();
	const { decodedToken, isExpired } = useJwt(token!);

	useEffect(() => {
		if (decodedToken && !isExpired) {
			const { email_address } = decodedToken as any;

			setUser({
				email_address,
				password: "",
				confirm_password: "",
			} as User);

			// we need to verify that account does not exist on backend
			// ................
			dispatch(exists_user_request(email_address));
		} else if (isExpired) {
			navigate("/");
		}
	}, [decodedToken, isExpired]);

	useEffect(() => {
		if (existingUser) {
			// should be redirect to the existing account page
			navigate("/");
		}
	}, [existingUser]);

	const handleOnSubmit = (user: User) => {
		dispatch(create_user_request(user));
	};

	const handleOnSuccess = () => {
		// should be redirect to the existing account page
		navigate("/");
	};

	return (
		<div className="NewPassword">
			{existingUser == null ? (
				<h4>Loading...</h4>
			) : (
				<UserForm
					initialValue={user!}
					submit={handleOnSubmit}
					success={handleOnSuccess}
				/>
			)}
		</div>
	);
};
