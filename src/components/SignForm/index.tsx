import { useAuth } from "hooks/useAuth";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { Account } from "types/Account";
import { TextField } from "utils/components/TextField";

const account: Account = {
	email_address: "",
	password: "",
};

const validate = yup.object({
	email_address: yup.string().email().required(),
});

export const SignForm = () => {
	const { auth, errors, sign, cleanErrors, loading } = useAuth();
	const navigate = useNavigate();
	const { state } = useLocation();

	useEffect(() => {
		if (errors) {
		}

		if (auth) {
			navigate("/");
		}

		return () => {
			// clean errors in global state
			cleanErrors();
		};
	}, [errors, auth]);

	const formikBag = useFormik({
		initialValues: account,
		validationSchema: validate,
		onSubmit: (values: any, actions: any) => {
			console.log(values);
			sign(values);
			actions.setSubmitting(true);
		},
	});

	return (
		<div className="SignForm">
			<FormikProvider value={formikBag}>
				<Form className="flex flex-col text-gray-800 py-8 px-8 max-w-sm max-h-max shadow-md ">
					<TextField label="Email" name="email_address" type="email" />
					<TextField label="Password" name="password" type="password" />
					<div className="flex justify-between">
						<button type="submit">{loading ? "loading..." : "Sign"}</button>
						<Link to="/">Forgot your password</Link>
					</div>

					<p className="text-xs text-center text-gray-500 mt-2">
						*if you do not have an access account, please communicate with your
						system administrator.
					</p>
				</Form>
			</FormikProvider>
		</div>
	);
};
