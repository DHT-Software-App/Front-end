// form controls
import { Logo } from "components/Logo";
import { Message } from "components/Message";
import { TextField } from "components/TextField";

// validation
import { Form, FormikProvider, useFormik } from "formik";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "types/User";
import * as yup from "yup";

const initialValue: User = {
  email: '',
  password: ''
}

// Validation Schema
const validationSchema = yup.object({
  email: yup.string().email('Expect a valid email').required('Email required'),
});

export const SignForm = () => {
  // Auth hook
  const { loading, error, sign, cleanError } = useAuth();

  useEffect(() => {
    return () => {
      cleanError();
    }
  }, []);


  // Formig Bag
  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      sign(values);
      setSubmitting(false);
    },
  });

  // Extract Some Properties From Formik Bag
  const { isSubmitting, isValid, setFieldValue, setFieldError } = formikBag;


  return <div className="SignForm bg-white rounded-md">
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

          {
            error && <Message backgroundColor="danger" >
              {error.message}
            </Message>
          }
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
}