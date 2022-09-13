import { DynamicList } from "components/DynamicList";
import { useFormik, Form, FormikProvider } from "formik";
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

const validate = yup.object({

});


export const CalendarForm = ({
  initialValue,
  submit,
}: {
  initialValue: Calendar;
  submit: (calendar: Calendar) => void;
}) => {
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
    setFieldError('policy_number', 'nooo')
    if (token) {
      dispatch(get_jobs_request(token));
      // TODO: ONLY GET TECHNICIAN EMPLOYEE
      dispatch(get_employees_request(token));
    }
  }, [token]);

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

  // when selected job changed
  useEffect(() => {
    if (selectedJob) {
      setFieldValue('job', selectedJob);
    }
  }, [selectedJob]);

  // when selected employee changed
  useEffect(() => {
    if (selectedEmployee) {
      setFieldValue('employee', selectedEmployee);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    if (contacts) {
      setFieldValue('contacts', contacts);
    }
  }, [contacts]);


  const formikBag = useFormik({
    initialValues: initialValue,
    validationSchema: validate,
    onSubmit: (values, { setSubmitting }) => {

      // submit(values as Calendar);

      // setSubmitting(false);
    },
  });

  const { isSubmitting, isValid, setFieldValue, setFieldError } = formikBag;

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
              <DynamicList title="manage contacts" values={contacts} onChange={setContacts} />
            </div>

            <div className="col-span-2 z-20">
              <DateTimePicker label="Start Date" onChange={() => { }} value={new Date()} required />
            </div>

            <div className="col-span-2">
              <DateTimePicker label="End Date" onChange={() => { }} value={new Date()} required />
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
            disabled={isSubmitting || !isValid || loading}
            className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-slate-100 disabled:text-slate-300"
          >
            {loading ? 'Processing' : 'Save Appointment'}
          </button>

        </footer>
      </div>
    </Form>
  </FormikProvider>
};