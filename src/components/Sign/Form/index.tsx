import { useAuth } from "hooks/useAuth";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { User } from "types/User";
import { TextField } from "components/TextField";
import { Logo } from "components/Logo";
import { useDispatch } from "react-redux";
import { clear_auth_errors, clear_auth_success } from "actions/auth";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import { ResponseError } from "utils/errors/ResponseError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const user: User = {
  email: "",
  password: "",
};

const validate = yup.object({
  email: yup.string().email().required(),
});

export const SignForm = () => {
  const dispatch = useDispatch();

  const {
    auth,
    errors: auth_errors,
    sign,
    loading,
    success: auth_success,
  } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const formikBag = useFormik({
    initialValues: user,
    validationSchema: validate,
    onSubmit: (values: any, { setSubmitting }) => {
      sign(values as User);

      // setSubmitting(false);
    },
  });

  const { setFieldError } = formikBag;

  // when server errors
  useEffect(() => {
    if (auth_errors) {
      // InvalidAttributeError
      if (auth_errors.some((e: {}) => e instanceof InvalidAttributeError)) {
        const errors = auth_errors as InvalidAttributeError[];

        errors.forEach((error: InvalidAttributeError) => {
          const { attribute, detail } = error.content;
          setFieldError(attribute, detail);
        });
      }

      if (auth_errors.some((e: {}) => e instanceof ResponseError)) {
      }
    }
  }, [auth_errors]);

  // when success
  useEffect(() => {
    if (auth_success) {
      const success = auth_success as SuccessResponse;
    }
  }, [auth_success]);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }

    return () => {
      dispatch(clear_auth_errors());
      dispatch(clear_auth_success());
    };
  }, [auth]);

  return (
    <div className="SignForm bg-white rounded-md">
      <FormikProvider value={formikBag}>
        <Form className="flex flex-col text-gray-800 py-8 px-12 max-w-sm max-h-max shadow-md ">
          <div className="flex justify-center mb-10 mt-4">
            <Logo />
          </div>
          <div className="space-y-4">
            <div>
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue text-white text-xs hover:cursor-pointer font-semibold px-5 py-3 uppercase tracking-wider"
              >
                {loading ? "loading..." : "login"}
              </button>
              <Link to="/forgot-password" className="text-blue text-xs">
                Forgot your password?
              </Link>
            </div>
          </div>

          <p className="text-xs text-justify tracking-wide text-slate-400 mb-4 mt-7">
            *if you do not have an access account, please communicate with your
            system administrator.
          </p>
        </Form>
      </FormikProvider>
    </div>
  );
};