import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { User } from "types/User";
import { TextField } from "components/TextField";
import { Logo } from "components/Logo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import { Loading } from "components/Loading";
import { forgot_password_request } from "actions/auth";

const user: User = {
  email: "",
};

const validate = yup.object({
  email: yup.string().email().required(),
});

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    loading,
    errors: auth_errors,
  }: {
    loading: boolean;
    errors: Error[];
  } = useSelector(({ auth }: any) => auth);

  const formikBag = useFormik({
    initialValues: user,
    validationSchema: validate,
    onSubmit: (values: User) => {
      dispatch(forgot_password_request(values));
    },
  });

  const { isSubmitting, isValid, setFieldError } = formikBag;

  // when server errors
  useEffect(() => {
    if (auth_errors) {
      // InvalidAttributeError
      if (auth_errors.some((e) => e instanceof InvalidAttributeError)) {
        const errors = auth_errors as InvalidAttributeError[];

        errors.forEach((error: InvalidAttributeError) => {
          const { attribute, detail } = error.content;
          setFieldError(attribute, detail);
        });
      }
    }
  }, [auth_errors]);

  return (
    <div className="SignForm bg-white rounded-md">
      <FormikProvider value={formikBag}>
        <Form className="flex flex-col text-gray-800 py-8 px-12 max-w-sm max-h-max shadow-md ">
          <div className="flex justify-center mb-10 mt-4">
            <Logo />
          </div>
          <div className="divide-y divide-slate-300">
            <div className="space-y-4 mb-8">
              <div>
                <TextField label="Email" name="email" type="email" />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="bg-blue text-white w-full text-xs hover:cursor-pointer font-semibold px-5 py-3 uppercase tracking-wider disabled:bg-slate-100 disabled:text-slate-300"
                >
                  {loading ? <Loading width={24} /> : "Send Recovery Link"}
                </button>
              </div>
            </div>

            <div className="w-full pt-4 flex justify-center">
              <Link to="/sign" className="text-blue text-xs">
                Back to login
              </Link>
            </div>
          </div>

          <p className="text-xs text-justify tracking-wide text-slate-400 mb-4 mt-7">
            *if you do not have login credentials, please communicate with your
            system administrator.
          </p>
        </Form>
      </FormikProvider>
    </div>
  );
};