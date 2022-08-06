import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { User } from "types/User";
import { TextField } from "components/TextField";
import { Logo } from "components/Logo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loading } from "components/Loading";

const user: User = {
  password: "",
  password_confirmation: "",
};

const validate = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must contain min 8 characters, one Uppercase, one lowercase and one number"
    ),
  password_confirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

type PasswordFormProps = {
  submit: (user: User) => void;
};

export const PasswordForm = ({ submit }: PasswordFormProps) => {
  const { loading } = useSelector(({ auth }: any) => auth);

  const formikBag = useFormik({
    initialValues: user,
    validationSchema: validate,
    onSubmit: (values: User, actions: any) => {
      submit(values);
      actions.setSubmitting(true);
    },
  });

  return (
    <div className="SignForm bg-white rounded-md">
      <FormikProvider value={formikBag}>
        <Form className="flex flex-col text-gray-800 py-8 px-12 max-w-sm max-h-max shadow-md ">
          <div className="flex justify-center mb-10 mt-4">
            <Logo />
          </div>
          <div className="divide-y divide-slate-300">
            <div className="space-y-4 mb-8">
              <TextField label="Password" name="password" type="password" />

              <TextField
                label="Confirm password"
                name="password_confirmation"
                type="password"
              />

              <div className="flex justify-center items-center">
                {loading ? (
                  <Loading width={32} />
                ) : (
                  <button
                    type="submit"
                    className="bg-blue text-white w-full text-xs hover:cursor-pointer font-semibold px-5 py-3 uppercase tracking-wider"
                  >
                    save changes
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-justify tracking-wide text-slate-400 mb-4 mt-7">
            *if you need to help, please communicate with your system
            administrator.
          </p>
        </Form>
      </FormikProvider>
    </div>
  );
};