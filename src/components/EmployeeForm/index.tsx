import { DropDown, DropMetaOption } from "components/DropDown";
import { DropDownItem } from "components/DropDownItem";
import { useFormik, Form, FormikProvider } from "formik";
import { useCountry } from "hooks/useCountry";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Employee } from "types/Employee";
import { TextField } from "utils/components/TextField";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import * as yup from "yup";
import "yup-phone";

const validate = yup.object({
	firstname: yup
		.string()
		.max(50, "First name must be max 50 characters")
		.required("First name required."),
	lastname: yup
		.string()
		.max(50, "First name must be max 50 characters")
		.required("Last name required."),
	email_address: yup
		.string()
		.email()
		.max(100, "Must be max 45 characters.")
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
		.max(45, "State must be max 45 characters")
		.required("State required."),
	street: yup
		.string()
		.max(45, "State must be max 45 characters")
		.required("Street required."),
	city: yup
		.string()
		.max(45, "State must be max 45 characters")
		.required("City required"),
	zip: yup.string().required("Zip required"),
	status: yup
		.string()
		.oneOf(["active", "desactive"])
		.required("Status required"),
});

const statusOptions: DropMetaOption[] = [
	{
		display: "Desactive",
		value: "desactive",
	},
	{
		display: "Active",
		value: "active",
	},
];

export const EmployeeForm = ({
	initialValue,
	submit,
}: {
	initialValue: Employee;
	submit: (employee: Employee, roleName: string) => void;
}) => {
	const { employee: authenticated }: { employee: Employee } = useSelector(
		({ auth }: any) => auth
	);
	const {
		errors: employee_errors,
		loading,
	}: {
		errors: Error[];
		loading: boolean;
	} = useSelector(({ employee }: any) => employee);
	const [selectedStatus, setSelectedStatus] = useState(
		initialValue.status
			? ({
					display: initialValue.status,
					value: initialValue.status,
			  } as DropMetaOption)
			: statusOptions[0]
	);

	const [flagIcon, setFlagIcon] = useState<string>();
	const { country, getCurrentCountry } = useCountry();

	const [allowedRoles, setAllowedRoles] = useState<DropMetaOption[]>();
	const [selectedRole, setSelectedRole] = useState<DropMetaOption>();

	useEffect(() => {
		getCurrentCountry();
	}, []);

	useEffect(() => {
		if (authenticated) {
			const allowedRoles: DropMetaOption[] = [];

			for (let ability of authenticated.abilities!) {
				if (ability.title == "employees" && ability.name?.includes("create")) {
					const role = ability.name.split(":")[1];

					allowedRoles.push({
						display: role,
						value: role,
					});
				}
			}

			setAllowedRoles(allowedRoles);
			setSelectedRole(allowedRoles[0]);
		}
	}, [authenticated]);

	useEffect(() => {
		if (country) {
			const { country: code } = country;

			setFlagIcon(`https://flagcdn.com/w20/${code.toLowerCase()}.png`);
		}
	}, [country]);

	const formikBag = useFormik({
		initialValues: initialValue,
		validationSchema: validate,
		onSubmit: (values, { setSubmitting }) => {
			submit(values as Employee, selectedRole?.value);

			setSubmitting(false);
		},
	});

	const { isSubmitting, isValid, setFieldValue, setFieldError, errors } =
		formikBag;

	// when server errors
	useEffect(() => {
		if (employee_errors) {
			// InvalidAttributeError
			if (employee_errors.some((e) => e instanceof InvalidAttributeError)) {
				const errors = employee_errors as InvalidAttributeError[];

				errors.forEach((error: InvalidAttributeError) => {
					const { attribute, detail } = error.content;
					setFieldError(attribute, detail);
				});
			}
		}
	}, [employee_errors]);

	useEffect(() => {
		if (selectedStatus) {
			setFieldValue("status", selectedStatus.value);
		}
	}, [selectedStatus]);

	return allowedRoles ? (
		<FormikProvider value={formikBag}>
			<Form>
				<div className="flex flex-col py-14 px-10 max-w-screen-lg space-y-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<h3 className="font-bold text-xl">Employee Information</h3>
						<div className="space-x-2">
							<span className="text-xs  text-blue">Your Current Ubication</span>
							<img src={flagIcon} className="inline w-4" />
						</div>
					</div>

					<div>
						<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
							<div className="col-span-2">
								<TextField
									label="First Name"
									name="firstname"
									type="text"
									required
								/>
							</div>
							<div className="col-span-2">
								<TextField
									label="Last Name"
									name="lastname"
									type="text"
									required
								/>
							</div>
							<div className="col-span-2">
								<TextField label="Street" name="street" type="text" required />
							</div>

							<div className="col-span-2">
								<TextField
									label="Email Address"
									name="email_address"
									type="email"
									required
								/>
							</div>
							<div className="col-span-1">
								<DropDown
									label="Status"
									value={selectedStatus}
									onChange={setSelectedStatus}
									required
								>
									{statusOptions.map((option, index) => (
										<DropDownItem key={index} value={option}>
											{option.display}
										</DropDownItem>
									))}
								</DropDown>
							</div>
							<div className="col-span-1">
								<DropDown
									label="Role"
									value={selectedRole! || allowedRoles[0]!}
									onChange={setSelectedRole}
									required
								>
									{allowedRoles.map((option, index) => (
										<DropDownItem key={index} value={option}>
											{option.display}
										</DropDownItem>
									))}
								</DropDown>
							</div>
							<div className="col-span-2">
								<TextField label="State" name="state" type="text" required />
							</div>

							<div className="col-span-2">
								<TextField
									label="Contact #1"
									name="contact_1"
									type="tel"
									required
								/>
							</div>

							<div className="col-span-2">
								<TextField
									label="Contact #2"
									name="contact_2"
									type="tel"
									required
								/>
							</div>

							<div className="col-span-1">
								<TextField label="City" name="city" type="text" required />
							</div>

							<div className="col-span-1">
								<TextField label="Zip" name="zip" type="text" required />
							</div>
						</div>

						<p className="text-xs text-center md:text-left  text-slate-400 font-semibold mt-3">
							In order to process registration provide the following
							information. All fields marked with an asterisk (*) are required.
						</p>
					</div>

					<div className="flex gap-x-4">
						<button
							type="submit"
							disabled={isSubmitting || !isValid}
							className="bg-blue text-white text-xs w-full md:w-auto font-semibold px-5 py-3 disabled:bg-slate-100 disabled:text-slate-300"
						>
							Save Employee
						</button>

						{/* <button
							type="reset"
							disabled={isSubmitting}
							className="bg-slate-100  text-slate-700 text-sm font-semibold px-5 py-3"
						>
							Reset
						</button> */}
					</div>
				</div>
			</Form>
		</FormikProvider>
	) : (
		<></>
	);
};
