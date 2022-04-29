import { useFormik, Form, FormikProvider } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Account } from "types/Account";
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

export const AccountForm = ({
	initialValue,
	submit,
	success,
}: {
	initialValue: Account;
	submit: (account: Account) => void;
	success: (account: Account) => void;
}) => {
	const { error, account, loading } = useSelector(
		({ account }: any) => account
	);

	const formikBag = useFormik({
		initialValues: initialValue,
		validationSchema: validate,
		onSubmit: (account) => {
			// proccessing on backend
			submit(account);
		},
	});

	const { isSubmitting, isValid, setErrors, setSubmitting } = formikBag;

	useEffect(() => {
		if (loading != null) {
			setSubmitting(loading);
		}
	}, [loading]);

	useEffect(() => {
		if (error) {
			setErrors(error);
		}

		if (account) {
			success(account);
		}
	}, [account, error]);

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
