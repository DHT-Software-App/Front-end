import { clear_auth_errors, clear_auth_success } from "actions/auth";
import { Feedback } from "components/Feedback";
import { ForgotPasswordForm } from "components/ForgotPasswordForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

export const ForgotPassword = () => {
  const { success }: { success: SuccessResponse } = useSelector(
    ({ auth }: any) => auth
  );

  useEffect(() => {
    return () => {
      clear_auth_errors();
      clear_auth_success();
    };
  }, []);

  return (
    <div className="min-h-screen grid place-content-center bg-blue-dark">
      <div className="absolute top-0 left-0 w-full z-50">
        {success && (
          <Feedback response={success} quit={() => clear_auth_success()} />
        )}
      </div>

      <ForgotPasswordForm />
    </div>
  );
};