import { PasswordForm } from "components/PasswordForm";
import { User } from "types/User";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	clean_auth,
	verify_email_request,
	verify_pin_request,
} from "actions/auth";
import { Loading } from "utils/components/Loading";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { Feedback } from "components/Feedback";

export const NewPasswordView = () => {
	const dispatch = useDispatch();

	const { token } = useParams();
	const navigate = useNavigate();

	const { loading, success: successFromAuth } = useSelector(
		({ auth }: any) => auth
	);

	// feedback
	const [successes, setSuccesses] = useState<SuccessResponse[]>([]);

	useEffect(() => {
		return () => {
			dispatch(clean_auth());
		};
	}, []);

	useEffect(() => {
		if (token) {
			dispatch(verify_pin_request(token));
		}
	}, [token]);

	useEffect(() => {
		if (successFromAuth) {
			setSuccesses([...successes, successFromAuth]);
		}
	}, [successFromAuth]);

	const handleOnSubmit = (user: User) => {
		dispatch(verify_email_request(user, token!));
	};

	const handleOnSuccess = () => {
		// should be redirect to the existing account page
		navigate("/");
	};

	const removeSuccess = (index: number) => {
		setSuccesses(successes.filter((success, i) => i != index));
	};

	return (
		<div className="min-h-screen grid place-content-center bg-blue-dark relative">
			{successes.map((success, index) => (
				<Feedback
					key={index}
					response={success}
					quit={() => removeSuccess(index)}
				/>
			))}

			{!token || loading ? (
				<div>
					<Loading width={50} />
				</div>
			) : (
				<PasswordForm submit={handleOnSubmit} />
			)}
		</div>
	);
};
