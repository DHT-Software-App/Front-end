import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { User } from "types/User";
import { TextField } from "utils/components/TextField";
import { Logo } from "components/Logo";

const user: User = {
	email: "",
	password: "",
};

const validate = yup.object({
	email: yup.string().email().required(),
});

export const ForgotPasswordForm = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	const formikBag = useFormik({
		initialValues: user,
		validationSchema: validate,
		onSubmit: (values: any, actions: any) => {
			console.log(values);
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
					<div className="divide-y divide-slate-300">
						<div className="space-y-4 mb-8">
							<div>
								<TextField label="Email" name="email" type="email" />
							</div>

							<div className="flex justify-between items-center">
								<button
									type="submit"
									className="bg-blue text-white w-full text-xs hover:cursor-pointer font-semibold px-5 py-3 uppercase tracking-wider"
								>
									{false ? "loading..." : "Send Recovery Link"}
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
