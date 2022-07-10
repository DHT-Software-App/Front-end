// form controls
import { ListBox } from "components/ListBox";
import { TextField } from "components/TextField";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CitiesStateProps, getAllCityRequest } from "reducers/cities";
import { cleanErrorFromCustomers, cleanSuccessFromCustomers, CustomersStateProps } from "reducers/customers";
import { getAllStateRequest, StatesStateProps } from "reducers/states";
import { City } from "types/City";
import { Customer } from "types/Customer";
import { State } from "types/State";
import * as yup from "yup";

const loadingIcon = require('assets/images/loading.gif');

// Validation Schema
const validationSchema = yup.object({
  first_name: yup
    .string()
    .max(50, "First name must be max 50 characters")
    .required("First name required."),
  last_name: yup
    .string()
    .max(50, "Last name must be max 50 characters")
    .required("Last name required."),
  email: yup
    .string()
    .email()
    .max(100, "Must be max 45 characters.")
    .required("Email address required"),
  street: yup
    .string()
    .email()
    .max(40, "Must be max 40 characters.")
    .required("Street required"),
  zip: yup.number(),
  id_state: yup.number().required("State required"),
  id_city: yup.number().required("City required"),
});

// Type Props
type CustomerTypeProps = {
  initialValue: Customer;
  submit: (employee: Customer) => void;
}

// Form Component
export const CustomerForm = (
  {
    initialValue,
    submit
  }: CustomerTypeProps
) => {
  const dispatch = useDispatch();

  // Read state
  const { error, loading }: CustomersStateProps = useSelector(({ customer }: any) => customer);
  const { cities }: CitiesStateProps = useSelector(({ city }: any) => city);
  const { states }: StatesStateProps = useSelector(({ state }: any) => state);
  const [selectedCity, setSelectedCity] = useState<City>();
  const [selectedState, setSelectedState] = useState<State>();
  const { accessToken } = useAuth();

  // Formig Bag
  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      // submit(values as Customer);
      // setSubmitting(false);
    },
  });

  // Extract Some Properties From Formik Bag
  const { isSubmitting, isValid, setFieldValue, setFieldError } = formikBag;

  // When mount/dismount
  useEffect(() => {
    dispatch(getAllCityRequest(accessToken!));
    dispatch(getAllStateRequest(accessToken!));
    return () => {
      cleanSuccessFromCustomers();
      cleanErrorFromCustomers();
    }
  }, []);

  // cities
  useEffect(() => {
    if (cities) {
      if (initialValue.id_city) {
        setSelectedCity(cities.find((city) => city.id == initialValue.id_city));
      } else {
        setSelectedCity(cities[0]);
      }
    }
  }, [cities]);

  useEffect(() => {
    if (selectedCity) {
      setFieldValue('id_city', selectedCity.id);
    }
  }, [selectedCity])

  // states
  useEffect(() => {
    if (states) {
      if (initialValue.id_state) {
        setSelectedState(states.find((state) => state.id == initialValue.id_state));
      } else {
        setSelectedState(states[0]);
      }
    }
  }, [states]);

  useEffect(() => {
    if (selectedState) {
      setFieldValue('id_state', selectedState.id);
    }
  }, [selectedState])


  // Manage Error From Backend
  useEffect(() => {
    if (error) {
      if ('paths' in error) {
        const { paths } = error;

        Object.keys(paths).forEach((path) => {
          setFieldError(path, paths[path]);
        });
      }
    }
  }, [error]);


  return <FormikProvider value={formikBag}>
    <Form>
      <div className="flex flex-col py-14 px-10 max-w-screen-lg space-y-12">
        <header>
          <h3 className="font-bold text-2xl">Customer Information</h3>
        </header>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* First Name */}
            <div className="col-span-2">
              <TextField
                label="First Name"
                name="first_name"
                type="text"
                required
              />
            </div>

            {/* Last Name */}
            <div className="col-span-2">
              <TextField
                label="Last Name"
                name="last_name"
                type="text"
                required
              />
            </div>

            {/* Email */}
            <div className="col-span-2">
              <TextField
                label="Email Address"
                name="email"
                type="email"
                required
              />
            </div>

            {/* Street */}
            <div className="col-span-2">
              <TextField label="Street" name="street" type="text" required />
            </div>

            {/* City */}
            <div className="col-span-2">
              {
                !selectedCity ?
                  <img src={loadingIcon} className="w-5 h-5" />
                  :
                  <ListBox defaultItem={selectedCity} items={cities!} displayName="city" onSelect={setSelectedCity} label="City" required />
              }
            </div>

            {/* State */}
            <div className="col-span-2">
              {
                !selectedState ?
                  <img src={loadingIcon} className="w-5 h-5" />
                  :
                  <ListBox defaultItem={selectedState} items={states!} displayName="state" onSelect={setSelectedState} label="State" required />
              }
            </div>

            {/* Zip */}
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
  </FormikProvider>

}
