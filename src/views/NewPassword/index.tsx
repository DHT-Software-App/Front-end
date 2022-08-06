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
import { Loading } from "components/Loading";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { Stepper } from "components/Stepper";
import { StepperItem } from "components/StepperItem";
import { RegisterEnum } from "enum/RegisterEnum";
import { ResponseError } from "utils/errors/ResponseError";

export const NewPassword = () => {
  const dispatch = useDispatch();

  const { token } = useParams();

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
  const [verifiedAccountSuccess, setVerifiedAccountSuccess] =
    useState<SuccessResponse>();

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
    if (validPinSuccess?.success) {
      dispatch(verify_email_request(token!));
    }
  }, [validPinSuccess]);

  useEffect(() => {
    if (successFromAuth) {
      switch (successFromAuth.code) {
        case RegisterEnum.VALID_PIN:
          setValidPinSuccess(successFromAuth);
          break;

        case RegisterEnum.VERIFIED_ACCOUNT:
          setVerifiedAccountSuccess(successFromAuth);
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

  const handleOnSubmit = (user: User) => { };

  if (verificationCompleted) {
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

  return (
    <div className="h-screen relative">
      <Stepper>
        <StepperItem
          title="Verify token"
          description={`${validPinSuccess?.message || "Your token will be verified."
            } `}
          checked={!!validPinSuccess}
          loading={!validPinSuccess && loading}
          invalid={validPinSuccess ? !validPinSuccess.success : false}
        />

        <StepperItem
          title="Verify email"
          description={`${verifiedAccountSuccess?.message || "Your email will be verified."
            } `}
          checked={!!verifiedAccountSuccess}
          loading={validPinSuccess && loading}
          invalid={
            verifiedAccountSuccess ? !verifiedAccountSuccess.success : false
          }
        />
      </Stepper>

      {verifiedAccountSuccess?.success && (
        <footer className="absolute z-10 bottom-0 w-screen px-6 py-3 flex justify-between bg-slate-50 items-center">
          <p className="text-slate-700 font-semibold text-base">
            You can now continue with reset your password
          </p>
          <button
            className="px-4 py-2 font-semibold text-sm border-2 rounded-md text-blue border-blue"
            onClick={() => setVerificationCompleted(true)}
          >
            RESET PASSWORD
          </button>
        </footer>
      )}
    </div>
  );
};