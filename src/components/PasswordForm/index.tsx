import { useFormik, Form, FormikProvider } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { User } from "types/User";
import { TextField } from "utils/components/TextField";
import * as yup from "yup";

const validate = yup.object({
	email_address: yup.string().email().max(45, "Must be max 45 characters."),
	password: yup
		.string()
		.min(8, "Must be min 8 characters.")
		.max(12, "Must be max 12 characters.")
		.required("Password is required"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("password"), null], "Password must match.")
		.required("Confirm password is required."),
});

export const PasswordForm = ({
	initialValue,
	submit,
	success,
}: {
	initialValue: User;
	submit: (user: User) => void;
	success: (user: User) => void;
}) => {
	const formikBag = useFormik({
		initialValues: initialValue,
		validationSchema: validate,
		onSubmit: (user) => {
			// proccessing on backend
			submit(user);
		},
	});

	const { isSubmitting, isValid, setErrors, setSubmitting } = formikBag;

	return (
		<FormikProvider value={formikBag}>
			<Form>
				<TextField label="Password" name="password" type="password" />
				<TextField
					label="Confirm Password"
					name="confirm_password"
					type="password"
				/>

				<button type="submit" disabled={isSubmitting || !isValid}>
					Save
				</button>
				<button type="reset" disabled={isSubmitting}>
					Reset
				</button>
			</Form>
		</FormikProvider>
	);
};
