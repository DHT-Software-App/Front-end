import { useFormik, Form, FormikProvider } from "formik";
import { useCountry } from "hooks/useCountry";
import { useState } from "react";
import { useEffect } from "react";
import { Employee } from "types/Employee";
import { TextField } from "utils/components/TextField";
import * as yup from "yup";
import "yup-phone";

const validate = yup.object({
	first_name: yup
		.string()
		.min(15, "First name must be min 15 characters")
		.max(50, "First name must be max 50 characters")
		.required("First name required."),
	last_name: yup
		.string()
		.min(25, "First name must be min 25 characters")
		.max(50, "First name must be max 50 characters")
		.required("Last name required."),
	email_address: yup
		.string()
		.email()
		.max(45, "Must be max 45 characters.")
		.required("Email address required"),
	contact_1: yup
		.string()
		.phone("IN", false, "Invalid regional phone")
		.required("Phone required"),
	contact_2: yup
		.string()
		.phone("IN", false, "Invalid regional phone")
		.required("Phone required"),
	state: yup
		.string()
		.min(5, "State must be min 5 characters")
		.max(45, "State must be max 45 characters")
		.required("State required."),
	street: yup
		.string()
		.min(15, "State must be min 15 characters")
		.max(45, "State must be max 45 characters")
		.required("Street required."),
	city: yup
		.string()
		.min(5, "State must be min 5 characters")
		.max(45, "State must be max 45 characters")
		.required("City required"),
	zip: yup.number().integer().required("Zip required"),
	status: yup
		.string()
		.oneOf(["active", "desactive"])
		.required("Status required"),
	role: yup.number().integer().required("Role required"),
});

export const EmployeeForm = ({ initialValue }: { initialValue: Employee }) => {
	const [flagIcon, setFlagIcon] = useState<string>();
	const { country, getCurrentCountry } = useCountry();

	useEffect(() => {
		getCurrentCountry();
	}, []);

	useEffect(() => {
		if (country) {
			const { country: code } = country;

			setFlagIcon(`https://flagcdn.com/w20/${code.toLowerCase()}.png`);
		}
	}, [country]);

	const formikBag = useFormik({
		initialValues: initialValue,
		validationSchema: validate,
		onSubmit: () => {},
	});

	const { isSubmitting, isValid } = formikBag;

	return (
		<FormikProvider value={formikBag}>
			<Form>
				<TextField label="First Name" name="first_name" type="text" />
				<TextField label="Last Name" name="last_name" type="text" />
				<TextField label="Email Address" name="email_address" type="email" />
				<TextField label="Contact #1" name="contact_1" type="tel" />
				<TextField label="Contact #2" name="contact_2" type="tel" />
				<TextField label="State" name="state" type="text" />
				<TextField label="Street" name="street" type="text" />
				<TextField label="City" name="city" type="text" />
				<TextField label="Zip" name="zip" type="number" />
				<TextField label="Status" name="status" type="text" />

				<img src={flagIcon} />

				<button type="submit" disabled={isSubmitting || !isValid}>
					Create
				</button>
				<button type="reset" disabled={isSubmitting}>
					Reset
				</button>
			</Form>
		</FormikProvider>
	);
};
