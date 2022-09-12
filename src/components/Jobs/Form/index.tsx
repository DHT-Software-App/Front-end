import { useFormik, ErrorMessage } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Job } from "types/Job";
import { TextField } from "components/TextField";
import { InvalidAttributeError } from "utils/errors/InvalidAttributeError";
import * as yup from "yup";
import { parseDateString } from "utils/yup/transforms";
import { ListBox } from "components/ListBox";
import { Customer } from "types/Customer";
import { get_customers_request } from "actions/customer";
import { Loading } from "components/Loading";
import { Client } from "types/Client";
import { WorkType } from "types/WorkType";
import { InsuranceCompany } from "types/InsuranceCompany";
import { get_clients_request } from "actions/client";
import { get_work_types_request } from "actions/workType";
import { get_insurance_companies_request } from "actions/insuranceCompany";
import DateTimePicker from "components/DateTimePicker";
import { FormikStep, FormikStepper } from "components/FormStepper";

const newJobStepValidate = yup.object({
  policy_number: yup
    .string()
    .trim()
    .max(75, 'Policy number must be max 75 characters')
    .required("Policy number required."),
  claim_number: yup
    .string()
    .trim()
    .max(75, 'Claim number must be max 75 characters')
    .required("Claim number required."),
})

const propertyInfoValidate = yup.object({
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
  zip: yup
    .string()
    .trim()
    .max(75, 'Zip must be max 75 characters')
    .required("Zip required."),
  company: yup.string()
    .max(75, "Company must be max 75 characters")
    .required("Company required."),
})

const lossInfoValidate = yup.object({
  notes: yup
    .string()
    .trim()
    .max(255, 'Notes must be max 255 characters')
    .required("Notes required."),
  date_of_loss: yup
    .date()
    .transform(parseDateString('yyyy-MM-dd HH:mm:ss'))
    .required("Date of loss required."),
  type_of_loss: yup
    .string()
    .trim()
    .max(75, 'Type of loss must be max 75 characters')
    .required("Type of loss required."),
})


const statusOptions: { display: string, value: "new" | "on going" | "completed" }[] = [
  {
    display: "New",
    value: "new",
  },
  {
    display: "On going",
    value: "on going",
  },
  {
    display: "Completed",
    value: "completed"
  }
];

export const JobForm = ({
  initialValue,
  submit,
}: {
  initialValue: Job;
  submit: (job: Job) => void;
}) => {
  const dispatch = useDispatch();

  const [allowedCustomers, setAllowedCustomers] = useState<Customer[]>();
  const [allowedClients, setAllowedClients] = useState<Client[]>();
  const [allowedWorkTypes, setAllowedWorkTypes] = useState<WorkType[]>();
  const [allowedInsurances, setAllowedInsurances] = useState<InsuranceCompany[]>();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(initialValue.customer!);
  const [selectedClient, setSelectedClient] = useState<Client>(initialValue.client!);
  const [selectedWorkType, setSelectedWorkType] = useState<WorkType>(initialValue.work_type!);
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceCompany>(initialValue.insurance!);

  const [selectedDateOfLoss, setSelectedDateOfLoss] = useState(new Date(initialValue.date_of_loss!));

  const [selectedStatus, setSelectedStatus] = useState(
    initialValue.status
      ? ({
        display: initialValue.status,
        value: initialValue.status,
      } as { display: string, value: string })
      : statusOptions[0]
  );


  // Formik 
  const formikBag = useFormik({
    initialValues: initialValue,
    onSubmit: (values, { setSubmitting }) => {
      submit(values as Job);

      setSubmitting(false);
    },
  });

  const { setFieldValue, setFieldError } = formikBag;


  const { auth: token } = useSelector(
    ({ auth }: any) => auth
  );

  const { loading: loadingCustomers, customers } = useSelector(
    ({ customer }: any) => customer
  );

  const { loading: loadingClients, clients } = useSelector(
    ({ client }: any) => client
  );

  const { loading: loadingWorkTypes, work_types } = useSelector(
    ({ workType }: any) => workType
  );

  const { loading: loadingInsurances, insuranceCompanies } = useSelector(
    ({ insuranceCompany }: any) => insuranceCompany
  );

  const {
    errors: job_errors,
    loading,
  }: {
    errors: Error[];
    loading: boolean;
  } = useSelector(({ job }: any) => job);

  // when component mounted
  useEffect(() => {
    setFieldError('policy_number', 'nooo')
    if (token) {
      dispatch(get_customers_request(token));
      dispatch(get_clients_request(token));
      dispatch(get_work_types_request(token));
      dispatch(get_insurance_companies_request(token));
    }
  }, [token]);


  // when customers loaded
  useEffect(() => {
    if (customers) {
      setAllowedCustomers(customers);

      if (initialValue.customer!) return;

      setSelectedCustomer(customers[0])

    }
  }, [customers]);

  // when clients loaded
  useEffect(() => {
    if (clients) {
      setAllowedClients(clients);

      if (initialValue.client!) return;

      setSelectedClient(clients[0])

    }
  }, [clients]);

  // when work types loaded
  useEffect(() => {
    if (work_types) {
      setAllowedWorkTypes(work_types);

      if (initialValue.work_type!) return;

      setSelectedWorkType(work_types[0])

    }
  }, [work_types]);

  // when insurances companies loaded
  useEffect(() => {
    if (insuranceCompanies) {
      setAllowedInsurances(insuranceCompanies);


      if (initialValue.insurance!) return;

      setSelectedInsurance(insuranceCompanies[0])

    }
  }, [insuranceCompanies]);

  // when selected customer changed
  useEffect(() => {
    if (selectedCustomer) {
      setFieldValue('customer', selectedCustomer);
    }
  }, [selectedCustomer]);

  // when selected client changed
  useEffect(() => {
    if (selectedClient) {
      setFieldValue('client', selectedClient);
    }
  }, [selectedClient]);

  // when selected work type changed
  useEffect(() => {
    if (selectedWorkType) {
      setFieldValue('work_type', selectedWorkType);
    }
  }, [selectedWorkType]);

  // when selected work type changed
  useEffect(() => {
    if (selectedInsurance) {
      setFieldValue('insurance', selectedInsurance);
    }
  }, [selectedInsurance]);

  // when date of loss changed
  useEffect(() => {
    if (selectedDateOfLoss) {
      setFieldValue('date_of_loss', selectedDateOfLoss);
    }

  }, [selectedDateOfLoss]);

  // when status changed
  useEffect(() => {
    if (selectedStatus) {
      setFieldValue("status", selectedStatus.value);
    }
  }, [selectedStatus]);

  // when server errors
  useEffect(() => {
    if (job_errors) {

      // InvalidAttributeError
      if (job_errors.some((e) => e instanceof InvalidAttributeError)) {
        const errors = job_errors as InvalidAttributeError[];

        errors.forEach((error: InvalidAttributeError) => {
          const { attribute, detail } = error.content;
          setFieldError(attribute, detail);
        });
      }

    }
  }, [job_errors]);

  const { work_type, status, customer, client, insurance, ...initialValues } = formikBag.values;

  return <div className="max-w-screen-lg">

    <FormikStepper value={{ ...formikBag, initialValues }} >
      <FormikStep title="New Job" validationSchema={newJobStepValidate}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {/* Policy number */}
          <div className="col-span-3">
            <TextField
              label="Policy number"
              name="policy_number"
              type="text"
              required
            />
          </div>

          {/* Claim number */}
          <div className="col-span-3">
            <TextField
              label="Claim number"
              name="claim_number"
              type="text"
              required
            />
          </div>

          {/* Customers List */}
          <div className="col-span-3 z-50">
            {allowedCustomers?.length && !loadingCustomers ? <ListBox defaultItem={selectedCustomer}
              items={allowedCustomers}
              displayName="firstname"
              label="Customer"
              required
              onSelect={setSelectedCustomer} /> : <Loading width={24} />}
          </div>

          {/* Insurance Companies List */}
          <div className="col-span-3 z-40">
            {allowedInsurances?.length && !loadingInsurances ?
              <ListBox defaultItem={selectedInsurance}
                items={allowedInsurances}
                displayName="name"
                label="Insurance Company"
                required
                onSelect={setSelectedInsurance} /> : <Loading width={24} />
            }
          </div>

        </div>
      </FormikStep>
      <FormikStep title="Property Info" validationSchema={propertyInfoValidate}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {/* Street */}
          <div className="col-span-6">
            <TextField label="Street" name="street" type="text" required />
          </div>

          {/* State */}
          <div className="col-span-6">
            <TextField label="State" name="state" type="text" required />
          </div>

          {/* City */}
          <div className="col-span-6">
            <TextField label="City" name="city" type="text" required />
          </div>

          {/* Zip */}
          <div className="col-span-3">
            <TextField label="Zip" name="zip" type="text" required />
          </div>

          {/* Company */}
          <div className="col-span-3">
            <TextField label="Company" name="company" type="text" required />
          </div>
        </div>

      </FormikStep>
      <FormikStep title="Loss Info" validationSchema={lossInfoValidate}>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {/* Type of loss */}
          <div className="col-span-3">
            <TextField label="Type of loss" name="type_of_loss" type="text" required />
          </div>

          {/* Date of loss */}
          <div className="col-span-3 z-50">
            <DateTimePicker label="Date of loss" maxDate={new Date()} value={selectedDateOfLoss!} onChange={setSelectedDateOfLoss} required />
            <ErrorMessage name="date_of_loss" component="div" className="error" />
          </div>


          {/* Work Types List */}
          <div className="col-span-3 z-40">
            {allowedWorkTypes?.length && !loadingWorkTypes ?
              <ListBox defaultItem={selectedWorkType}
                items={allowedWorkTypes}
                displayName="name"
                label="Work Type"
                required
                onSelect={setSelectedWorkType} /> : <Loading width={24} />}
          </div>


          {/* Clients List */}
          <div className="col-span-3 z-30">
            {allowedClients?.length && !loadingClients ? <ListBox defaultItem={selectedClient}
              items={allowedClients}
              displayName="firstname"
              label="Client"
              required
              onSelect={setSelectedClient} /> : <Loading width={24} />
            }
          </div>

          {/* Notes */}
          <div className="col-span-6">
            <TextField label="Notes" name="notes" type="text" required />
          </div>

          {/* Status */}
          <div className="col-span-3">
            <ListBox defaultItem={selectedStatus}
              items={statusOptions}
              displayName="display"
              label="Status"
              required
              onSelect={setSelectedStatus} />
          </div>

        </div>
      </FormikStep>

    </FormikStepper>



  </div>

};