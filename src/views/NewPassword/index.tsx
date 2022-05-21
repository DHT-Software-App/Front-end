import { PasswordForm } from "components/PasswordForm";
import { User } from "types/User";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const NewPasswordView = () => {
	const dispatch = useDispatch();

	const { token } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState<User>();

	const handleOnSubmit = (user: User) => {
		// dispatch();
	};

	const handleOnSuccess = () => {
		// should be redirect to the existing account page
		navigate("/");
	};

	return (
		<div className="NewPassword">
			<PasswordForm
				initialValue={user!}
				submit={handleOnSubmit}
				success={handleOnSuccess}
			/>
		</div>
	);
};
