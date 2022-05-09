import { useAuth } from "hooks/useAuth";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { Account } from "types/Account";
import { TextField } from "utils/components/TextField";
import { Logo } from "components/Logo";

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
		<div className="SignForm bg-white rounded-md">
			<FormikProvider value={formikBag}>
				<Form className="flex flex-col text-gray-800 py-8 px-12 max-w-sm max-h-max shadow-md ">
					<div className="flex justify-center mb-10 mt-4">
						<Logo className="w-36" />
					</div>
					<div className="space-y-4">
						<div>
							<TextField label="Email" name="email_address" type="email" />
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
