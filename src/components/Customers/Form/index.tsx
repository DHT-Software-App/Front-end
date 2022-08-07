import { DynamicList } from "components/DynamicList";
import { ListBox } from "components/ListBox";
import { useFormik, Form, FormikProvider } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Customer } from "types/Customer";
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
    .max(50, "Last name must be max 50 characters")
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
  has_insured: yup.bool().required(),
  insured_firstname: yup
    .string()
    .max(50, "Insured first name must be max 50 characters")
    .when('has_insured', {
      is: true,
      then: yup.string().required("Insured first name required.")
    }),
  insured_lastname: yup
    .string()
    .max(50, "Insured last name must be max 50 characters")
    .when('has_insured', {
      is: true,
      then: yup.string().required("Insured last name required.")
    }),
});

const hasInsuredOptions: { display: string, value: boolean }[] = [
  {
    display: "No",
    value: false,
  },
  {
    display: "Yes",
    value: true,
  },
];


export const CustomerForm = ({
  initialValue,
  submit,
}: {
  initialValue: Customer;
  submit: (customer: Customer) => void;
}) => {
  const [contacts, setContacts] = useState<string[]>(initialValue.contacts!);
  const [hasInsured, setHasInsured] = useState<{ display: string, value: boolean }>(
    hasInsuredOptions[+initialValue.has_insured!]
  )

  const {
    errors: customer_errors,
    loading,
  }: {
    errors: Error[];
    loading: boolean;
  } = useSelector(({ customer }: any) => customer);


  useEffect(() => {
    if (contacts) {
      setFieldValue('contacts', contacts);
    }
  }, [contacts])


  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema: validate,
    onSubmit: (values, { setSubmitting }) => {

      submit(values as Customer);

      setSubmitting(false);
    },
  });

  const { isSubmitting, isValid, setFieldValue, setFieldError } = formikBag;

  // when server errors
  useEffect(() => {
    if (customer_errors) {


      // InvalidAttributeError
      if (customer_errors.some((e) => e instanceof InvalidAttributeError)) {
        const errors = customer_errors as InvalidAttributeError[];

        errors.forEach((error: InvalidAttributeError) => {
          const { attribute, detail } = error.content;
          setFieldError(attribute, detail);
        });

      }


    }
  }, [customer_errors]);



  return <FormikProvider value={formikBag}>
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


            <div className="col-span-1">
              <ListBox defaultItem={hasInsured}
                items={hasInsuredOptions}
                displayName="display"
                label="Has Insured?"
                required
                onSelect={setHasInsured} />
            </div>

            <div className="col-span-2">
              <DynamicList title="manage contacts" values={contacts} onChange={setContacts} />
            </div>

            {
              hasInsured.value &&
              <>
                <div className="col-span-2">
                  <TextField
                    label="Insured First Name"
                    name="insured_firstname"
                    type="text"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <TextField
                    label="Insured Last Name"
                    name="insured_lastname"
                    type="text"
                    required
                  />
                </div>
              </>
            }

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
            {loading ? 'Processing' : 'Save Customer'}
          </button>

        </footer>
      </div>
    </Form>
  </FormikProvider>
};