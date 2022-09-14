import { DynamicList } from "components/DynamicList";
import { useFormik, Form, FormikProvider, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { Calendar } from "types/Calendar";
import { TextField } from "components/TextField";
import * as yup from "yup";
import { ListBox } from "components/ListBox";
import { Job } from "types/Job";
import { Employee } from "types/Employee";
import DateTimePicker from "components/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import { Loading } from "components/Loading";
import { get_jobs_request } from "actions/job";
import { get_employees_request } from "actions/employee";
import addDays from "date-fns/addDays"
import subDays from "date-fns/subDays"
import { parseDateString } from "utils/yup/transforms";

const validate = yup.object({
  address: yup
    .string()
    .trim()
    .max(255, 'Address must be max 255 characters')
    .required("Address required."),
  notes: yup
    .string()
    .trim()
    .max(255, 'Address must be max 255 characters')
    .required("Address required."),
  start_date: yup
    .date()
    .transform(parseDateString('yyyy-MM-dd HH:mm:ss'))
    .max(yup.ref('end_date'), 'Start date must be earlier than the end date')
    .required("Date of loss required."),
  end_date: yup
    .date()
    .transform(parseDateString('yyyy-MM-dd HH:mm:ss'))
    .min(yup.ref('start_date'), 'End date must be later than the start date')
    .required("Date of loss required."),
  contacts: yup.array(yup.string())
});

type CalendarFormProps = {
  initialValue: Calendar;
  onDelete?: (calendar: Calendar) => void;
  submit: (calendar: Calendar) => void;
}

export const CalendarForm = ({
  initialValue,
  submit, onDelete
}: CalendarFormProps) => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState<string[]>(initialValue.contacts!);
  const [allowedJobs, setAllowedJobs] = useState<Job[]>();
  const [allowedEmployees, setAllowedEmployees] = useState<Employee[]>();

  const [selectedJob, setSelectedJob] = useState<Job>(initialValue.job!);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(initialValue.employee!);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date(initialValue.start_date!));
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(initialValue.end_date!));

  const { auth: token } = useSelector(
    ({ auth }: any) => auth
  );

  const {
    errors: calendar_errors,
    loading,
  }: {
    errors: Error[];
    loading: boolean;
  } = useSelector(({ calendar }: any) => calendar);

  const { loading: loadingJobs, jobs } = useSelector(
    ({ job }: any) => job
  );

  const { loading: loadingEmployees, employees } = useSelector(
    ({ employee }: any) => employee
  );

  // when component mounted
  useEffect(() => {
    if (token) {
      dispatch(get_jobs_request(token));
      // TODO: ONLY GET TECHNICIAN EMPLOYEE
      dispatch(get_employees_request(token));
    }
  }, [token]);

  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema: validate,
    onSubmit: (values, { setSubmitting }) => {
      submit(values as Calendar);

      setSubmitting(false);
    },
  });

  const { isSubmitting, isValid, setFieldValue, setFieldError } = formikBag;

  // when jobs loaded
  useEffect(() => {
    if (jobs) {
      setAllowedJobs(jobs);

      if (initialValue.job!) return;

      setSelectedJob(jobs[0])

    }
  }, [jobs]);

  // when employees loaded
  useEffect(() => {
    if (employees) {
      setAllowedEmployees(employees);

      if (initialValue.employee!) return;

      setSelectedEmployee(employees[0])

    }
  }, [employees]);

  // when selected job change
  useEffect(() => {
    if (selectedJob) {
      setFieldValue('job', selectedJob);
    }
  }, [selectedJob]);

  // when selected employee change
  useEffect(() => {
    if (selectedEmployee) {
      setFieldValue('employee', selectedEmployee);
    }
  }, [selectedEmployee]);

  // when start date change
  useEffect(() => {
    if (selectedStartDate) {
      setFieldValue('start_date', selectedStartDate);
    }

  }, [selectedStartDate]);

  // when start date change
  useEffect(() => {
    if (selectedEndDate) {
      setFieldValue('end_date', selectedEndDate);
    }

  }, [selectedEndDate]);

  useEffect(() => {
    if (contacts) {
      setFieldValue('contacts', contacts);
    }
  }, [contacts]);


  // when server errors
  useEffect(() => {
    if (calendar_errors) {

      // InvalidAttributeError
      if (calendar_errors.some((e) => e instanceof InvalidAttributeError)) {
        const errors = calendar_errors as InvalidAttributeError[];

        errors.forEach((error: InvalidAttributeError) => {
          const { attribute, detail } = error.content;
          setFieldError(attribute, detail);
        });

      }


    }
  }, [calendar_errors]);


  return <FormikProvider value={formikBag}>
    <Form>
      <div className="flex flex-col py-14 px-10 max-w-screen-lg space-y-12">
        <header>
          <h3 className="font-bold text-2xl">New Appointment</h3>
        </header>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 z-50">
              {allowedJobs?.length && !loadingJobs ?
                <ListBox defaultItem={selectedJob}
                  items={allowedJobs}
                  displayName={["policy_number"]}
                  label="Select Job"
                  required
                  onSelect={setSelectedJob} /> : <Loading width={24} />
              }

            </div>

            <div className="col-span-2 z-40">
              {allowedEmployees?.length && !loadingEmployees ?
                <ListBox defaultItem={selectedEmployee}
                  items={allowedEmployees}
                  displayName={["firstname", 'lastname']}
                  label="Select Technician"
                  required
                  onSelect={setSelectedEmployee} /> : <Loading width={24} />
              }

            </div>

            <div className="col-span-2">
              <TextField label="Address" name="address" type="text" required />
            </div>

            <div className="col-span-2 z-30">
              <DynamicList title="manage contacts" values={contacts ?? []} onChange={setContacts} />
            </div>

            <div className="col-span-2 z-50">
              <DateTimePicker label="Start Date" maxDate={subDays(selectedEndDate, 1)} value={selectedStartDate} onChange={setSelectedStartDate} required />
              <ErrorMessage name="start_date" component="div" className="error" />
            </div>

            <div className="col-span-2 z-50">
              <DateTimePicker label="End date" minDate={addDays(selectedStartDate, 1)} value={selectedEndDate} onChange={setSelectedEndDate} required />
              <ErrorMessage name="end_date" component="div" className="error" />
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
        <footer className="flex flex-row-reverse gap-x-4 space-x-2">
          <button
            type="submit"
            disabled={isSubmitting || !isValid || loading}
            className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-slate-100 disabled:text-slate-300"
          >
            {loading ? 'Processing' : 'Save Appointment'}
          </button>

          {
            initialValue.id !== undefined && onDelete && <button
              type="button"
              disabled={isSubmitting || loading}
              onClick={() => onDelete(initialValue)}
              className="bg-red-500 text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-red-400 disabled:text-red-600"
            >
              Delete
            </button>
          }

        </footer>
      </div>
    </Form>
  </FormikProvider>
};