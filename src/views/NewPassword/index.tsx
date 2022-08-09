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
import { RegisterEnum } from "enum/RegisterEnum";
import { ResponseError } from "utils/errors/ResponseError";
import { Error } from "views/Error";

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
    auth: string;
  } = useSelector(({ auth }: any) => auth);

  const navigate = useNavigate();
  const [validPinSuccess, setValidPinSuccess] = useState<SuccessResponse>();
  const [resetPasswordSuccess, setResetPasswordSuccess] =
    useState<SuccessResponse>();

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
        case RegisterEnum.INVALID_PIN:
        case RegisterEnum.TOKEN_EXPIRED:
        case RegisterEnum.TOKEN_REQUIRED:
          setValidPinSuccess(successFromAuth);
          break;

        case RegisterEnum.RESET_PASSWORD:
          setResetPasswordSuccess(successFromAuth);
          break;

        case RegisterEnum.VERIFIED_ACCOUNT:
          navigate('/');
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
    dispatch(verify_email_request(token!, user));
  };


  return (
    <div className="h-screen relative">

      {
        resetPasswordSuccess?.success || (validPinSuccess?.success == undefined && 'Verifying...')
        || validPinSuccess?.success == false && <Error code={404} description={`Could not process your request`} title={validPinSuccess.message} showRedirectLink={false} />
      }

      {
        resetPasswordSuccess?.success && <div className="min-h-screen grid place-content-center bg-blue-dark relative">
          {!token || loading ? (
            <div>
              <Loading width="50px" />
            </div>
          ) : (
            <PasswordForm submit={handleOnSubmit} />
          )}
        </div>
      }
    </div>
  );
};