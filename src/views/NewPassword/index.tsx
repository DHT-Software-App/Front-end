import { PasswordForm } from "components/PasswordForm";
import { User } from "types/User";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	clear_auth_errors,
	clear_auth_success,
	verify_email_request,
	verify_pin_request,
} from "actions/auth";
import { Loading } from "utils/components/Loading";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { Stepper } from "utils/components/Stepper";
import { StepperItem } from "utils/components/StepperItem";
import { RegisterEnum } from "enum/RegisterEnum";
import { ResponseError } from "utils/errors/ResponseError";

export const NewPasswordView = () => {
	const dispatch = useDispatch();

	const { token } = useParams();
	const navigate = useNavigate();

	const {
		loading,
		success: successFromAuth,
		errors: auth_errors,
	}: {
		loading: boolean;
		success: SuccessResponse;
		errors: Error[];
	} = useSelector(({ auth }: any) => auth);

	const [validPinSuccess, setValidPinSuccess] = useState<SuccessResponse>();

	const [verificationCompleted, setVerificationCompleted] =
		useState<boolean>(false);

	useEffect(() => {
		return () => {
			dispatch(clear_auth_errors());
			dispatch(clear_auth_success());
		};
	}, []);

	useEffect(() => {
		if (token) {
			dispatch(verify_pin_request(token));
		}
	}, [token]);

	useEffect(() => {
		if (successFromAuth) {
			switch (successFromAuth.code) {
				case RegisterEnum.VALID_PIN:
					setValidPinSuccess(successFromAuth);
					break;

				default:
					break;
			}
		}
	}, [successFromAuth]);

	useEffect(() => {
		if (auth_errors) {
			if (auth_errors.some((e) => e instanceof ResponseError)) {
				const errors = auth_errors as ResponseError[];

				errors.forEach((error: ResponseError) => {
					setValidPinSuccess(error.content);
				});
			}
		}
	}, [auth_errors]);

	const handleOnSubmit = (user: User) => {
		dispatch(verify_email_request(user, token!));
	};

	const handleOnSuccess = () => {
		// should be redirect to the existing account page
		navigate("/");
	};

	if (!verificationCompleted) {
		return (
			<div className="h-screen">
				<Stepper>
					<StepperItem
						title="Verify token"
						description={`${
							validPinSuccess?.message || "Your token was been verified."
						} `}
						checked={!!validPinSuccess}
						loading={!validPinSuccess}
						invalid={validPinSuccess ? !validPinSuccess.success : false}
					/>
					{/* <StepperItem
						title="Invalid email"
						description="Your email must be valid."
						checked
						invalid
					/>
					<StepperItem
						title="Establish new password"
						description="You will establish a new password."
					/> */}
				</Stepper>
			</div>
		);
	} else {
		return (
			<div className="min-h-screen grid place-content-center bg-blue-dark relative">
				{!token || loading ? (
					<div>
						<Loading width={50} />
					</div>
				) : (
					<PasswordForm submit={handleOnSubmit} />
				)}
			</div>
		);
	}
};
