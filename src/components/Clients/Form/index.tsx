// form controls
import { DynamicList } from "components/DynamicList";
import { ListBox } from "components/ListBox";
import { TextField } from "components/TextField";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CitiesStateProps, getAllCityRequest } from "reducers/cities";
import { cleanErrorFromClients, cleanSuccessFromClients, ClientsStateProps } from "reducers/clients";
import { getAllStateRequest, StatesStateProps } from "reducers/states";
import { City } from "types/City";
import { Client } from "types/Client";
import { State } from "types/State";
import * as yup from "yup";

const loadingIcon = require('assets/images/loading.gif');

// Validation Schema
const validationSchema = yup.object({
  person_contact: yup
    .string()
    .max(70, "Person contact must be max 70 characters")
    .required("Person contact required."),
  company: yup
    .string()
    .max(100, "Company must be max 100 characters")
    .required("Company required."),
  // email: yup
  //   .string()
  //   .email()
  //   .max(100, "Must be max 45 characters.")
  //   .required("Email address required"),
  street: yup
    .string()
    .max(40, "Must be max 40 characters.")
    .required("Street required"),
  zip: yup.number(),
  // client_status: yup.boolean().required("Status required"),
  id_state: yup.number().required("State required"),
  id_city: yup.number().required("City required"),
});

// Type Props
type ClientTypeProps = {
  initialValue: Client;
  submit: (client: Client) => void;
}

type ClientStatusListItem = {
  value: boolean;
  display: string;
}

const clientStatusListItems: ClientStatusListItem[] = [
  {
    display: 'Active',
    value: true
  },
  {
    display: 'Desactive',
    value: false
  }
]

// Form Component
export const ClientForm = (
  {
    initialValue,
    submit
  }: ClientTypeProps
) => {
  const dispatch = useDispatch();
  // Read state
  const { error, loading }: ClientsStateProps = useSelector(({ client }: any) => client);
  const { cities }: CitiesStateProps = useSelector(({ city }: any) => city);
  const { states }: StatesStateProps = useSelector(({ state }: any) => state);
  const [selectedCity, setSelectedCity] = useState<City>();
  const [selectedState, setSelectedState] = useState<State>();
  const [contacts, setContacts] = useState<string[]>(initialValue.contact);
  const { accessToken } = useAuth();

  // Formig Bag
  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      submit(values as Client);
      setSubmitting(false);
    },
  });

  // Extract Some Properties From Formik Bag
  const { isSubmitting, isValid, setFieldValue, setFieldError } = formikBag;

  // When mount/dismount
  useEffect(() => {
    dispatch(getAllCityRequest(accessToken!));
    dispatch(getAllStateRequest(accessToken!));

    return () => {
      cleanSuccessFromClients();
      cleanErrorFromClients();
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

  useEffect(() => {
    if (contacts) {
      setFieldValue('contact', contacts);
    }
  }, [contacts])

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

  // handlers
  const handleSelectedClientStatus = (selectedClientStatus: ClientStatusListItem) => {
    setFieldValue('client_status', selectedClientStatus.value);
  }


  return <FormikProvider value={formikBag}>
    <Form>
      <div className="flex flex-col py-14 px-10 max-w-screen-lg space-y-12">
        <header>
          <h3 className="font-bold text-2xl">Client Reference Information</h3>
        </header>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Person Contact */}
            <div className="col-span-2">
              <TextField
                label="Person Contact"
                name="person_contact"
                type="text"
                required
              />
            </div>

            {/* Company */}
            <div className="col-span-2">
              <TextField
                label="Company"
                name="company"
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

            {/* Client Status */}
            {/* <div className="col-span-1">
              <ListBox
                items={clientStatusListItems}
                defaultItem={clientStatusListItems.find((status) => status.value == initialValue.client_status)!}
                onSelect={handleSelectedClientStatus}
                displayName="display"
                label="Status"
                required
              />
            </div> */}

            {/* Contacts */}
            <div className="col-span-2">
              <DynamicList title="manage contacts" values={contacts} onChange={setContacts} />
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
            {loading ? 'Processing' : 'Save Client'}
          </button>

        </footer>
      </div>
    </Form>
  </FormikProvider>

}