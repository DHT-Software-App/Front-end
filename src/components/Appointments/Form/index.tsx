import { DynamicList } from "components/DynamicList";
import { useFormik, Form, FormikProvider } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Appointment } from "types/Appointment";
import { TextField } from "components/TextField";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import * as yup from "yup";
import { ListBox } from "components/ListBox";
import { Job } from "types/Job";
import { Employee } from "types/Employee";
import DateTimePicker from "components/DateTimePicker";

const validate = yup.object({

});

const jobs: Job[] = [
  {
    id: 2,
    claim_number: '123232'
  },
  {
    id: 3,
    claim_number: '123232'
  }
];

const technicians: Employee[] = [
  {
    id: 2,
    firstname: 'Robert',
    lastname: 'Smith'
  },
  {
    id: 1,
    firstname: 'Frank',
    lastname: 'Peralta'
  }
]

export const AppointmentForm = ({
  initialValue,
  submit,
}: {
  initialValue: Appointment;
  submit: (appointment: Appointment) => void;
}) => {
  const [contacts, setContacts] = useState<string[]>(initialValue.contacts!);
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  const [selectedTechnician, setSelectedTechnician] = useState<Employee>(technicians[0]);


  // const {
  //   errors: appointment_errors,
  //   loading,
  // }: {
  //   errors: Error[];
  //   loading: boolean;
  // } = useSelector(({ appointment }: any) => appointment);


  // useEffect(() => {
  //   if (contacts) {
  //     setFieldValue('contacts', contacts);
  //   }
  // }, [contacts])


  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema: validate,
    onSubmit: (values, { setSubmitting }) => {

      // submit(values as Appointment);

      // setSubmitting(false);
    },
  });

  const { isSubmitting, isValid, setFieldValue, setFieldError } = formikBag;

  // when server errors
  // useEffect(() => {
  //   if (appointment_errors) {


  //     // InvalidAttributeError
  //     if (appointment_errors.some((e) => e instanceof InvalidAttributeError)) {
  //       const errors = appointment_errors as InvalidAttributeError[];

  //       errors.forEach((error: InvalidAttributeError) => {
  //         const { attribute, detail } = error.content;
  //         setFieldError(attribute, detail);
  //       });

  //     }


  //   }
  // }, [appointment_errors]);



  return <FormikProvider value={formikBag}>
    <Form>
      <div className="flex flex-col py-14 px-10 max-w-screen-lg space-y-12">
        <header>
          <h3 className="font-bold text-2xl">New Appointent</h3>
        </header>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <ListBox defaultItem={selectedJob}
                items={jobs}
                displayName="claim_number"
                label="Select Job"
                required
                onSelect={setSelectedJob} />
            </div>

            <div className="col-span-2">
              <ListBox defaultItem={selectedTechnician}
                items={technicians}
                displayName="firstname"
                label="Select Job"
                required
                onSelect={setSelectedTechnician} />
            </div>

            <div className="col-span-2">
              <TextField label="Address" name="address" type="text" required />
            </div>

            <div className="col-span-2">
              <DynamicList title="manage contacts" values={contacts} onChange={setContacts} />
            </div>

            <div className="col-span-2">
              <DateTimePicker label="Start Date" onChange={() => { }} value={new Date()} required />
            </div>

            <div className="col-span-2">
              <DateTimePicker label="Start Date" onChange={() => { }} value={new Date()} required />
            </div>

            <div className="col-span-4">
              <TextField label="Notes" name="notes" type="text" required />
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
            disabled={isSubmitting || !isValid /* || loading */}
            className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-slate-100 disabled:text-slate-300"
          >
            {/* {loading ? 'Processing' : 'Save Appointment'} */}
            Save Appointment
          </button>

        </footer>
      </div>
    </Form>
  </FormikProvider>
};