import { DynamicList } from "components/DynamicList";
import { ListBox } from "components/ListBox";
import { useFormik, Form, FormikProvider } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Employee } from "types/Employee";
import { TextField } from "components/TextField";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import * as yup from "yup";


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
  contacts: yup.array(yup.string()),
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

const statusOptions: { display: string, value: string }[] = [
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
  const [contacts, setContacts] = useState<string[]>(initialValue.contacts!);
  const [allowedRoles, setAllowedRoles] = useState<{ display: string, value: string }[]>();
  const [selectedRole, setSelectedRole] = useState<{ display: string, value: string }>();
  const [selectedStatus, setSelectedStatus] = useState(
    initialValue.status
      ? ({
        display: initialValue.status,
        value: initialValue.status,
      } as { display: string, value: string })
      : statusOptions[0]
  );

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


  useEffect(() => {
    if (contacts) {
      setFieldValue('contacts', contacts);
    }
  }, [contacts])

  useEffect(() => {
    if (authenticated) {
      const allowedRoles: { display: string, value: string }[] = [];

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


  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema: validate,
    onSubmit: (values, { setSubmitting }) => {
      submit(values as Employee, selectedRole?.value!);

      setSubmitting(false);
    },
  });

  const { isSubmitting, isValid, setFieldValue, setFieldError, errors } = formikBag;

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


  return allowedRoles ? <FormikProvider value={formikBag}>
    <Form>
      <div className="flex flex-col py-14 px-10 max-w-screen-lg space-y-12">
        <header>
          <h3 className="font-bold text-2xl">Employee Information</h3>
        </header>

        <section>
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
              <TextField
                label="Email Address"
                name="email_address"
                type="email"
                required
              />
            </div>

            <div className="col-span-2">
              <DynamicList title="manage contacts" values={contacts ?? []} onChange={setContacts} />
            </div>

            <div className="col-span-1">
              <ListBox defaultItem={selectedStatus}
                items={statusOptions}
                displayName={["display"]}
                label="Status"
                required
                onSelect={setSelectedStatus} />

            </div>

            <div className="col-span-1">
              <ListBox defaultItem={selectedRole! || allowedRoles[0]!}
                items={allowedRoles}
                displayName={["display"]}
                label="Role"
                required
                onSelect={setSelectedRole} />

            </div>

            <div className="col-span-2">
              <TextField label="Street" name="street" type="text" required />
            </div>

            <div className="col-span-1">
              <TextField label="City" name="city" type="text" required />
            </div>

            <div className="col-span-1">
              <TextField label="State" name="state" type="text" required />
            </div>

            <div className="col-span-1">
              <TextField label="Zip" name="zip" type="text" required />
            </div>



          </div>

          <p className="text-sm text-center md:text-left text-slate-400 font-semibold mt-3">
            In order to process registration provide the following
            information. All fields marked with an asterisk (*) are required.
          </p>
        </section>

        {/* Footer - Buttons */}
        <footer className="flex gap-x-4">
          <button
            type="submit"
            disabled={isSubmitting || !isValid || loading}
            className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-slate-100 disabled:text-slate-300"
          >
            {loading ? 'Processing' : 'Save Employee'}
          </button>

        </footer>
      </div>
    </Form>
  </FormikProvider> : (
    <></>
  );
};