import { FormikConfig, FormikValues, Form, FormikContextType, FormikProvider, FormikState } from "formik";
import React, { useState } from "react"

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> { }

export function FormikStep({ children }: FormikStepProps) {
  return <>
    {children}
  </>
}

type FormikStepperProps = {
  value: FormikContextType<any>,
  children: React.ReactElement<FormikStepProps>[]
}


export function FormikStepper({ children, value }: FormikStepperProps) {
  const [step, setStep] = useState(0);
  const currentChild = children[step];

  const isLastStep = () => {
    return step === children.length - 1;
  }

  value.validationSchema = currentChild.props.validationSchema;


  // Formik bag
  const {
    isSubmitting,
    isValid,
    setFormikState,
    errors
  } = value;

  // setFormikState((f: FormikState<any>): any => {
  //   f.values = {
  //     'dom': 'ata'
  //   }
  // });


  // console.log(errors)

  console.log(currentChild.props.validationSchema);

  // {...props}
  // validationSchema={currentChild.props.validationSchema}
  // onSubmit={async (values, helpers) => {
  //   if (isLastStep()) {
  //     await props.onSubmit(values, helpers)
  //   } else {
  //     setStep(s => s + 1);
  //   }
  // }}

  return <FormikProvider value={value} >

    <Form autoComplete="off">
      {currentChild}

      <footer className="flex gap-x-4">
        {/* Actions */}
        {
          step > 0 ?
            <button
              onClick={() => setStep(s => s - 1)}
              className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-slate-100 disabled:text-slate-300">
              Back Step
            </button> : null
        }

        <button
          type="submit"
          onClick={() => setStep(s => s + 1)}
          disabled={isSubmitting || !isValid}
          className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-slate-100 disabled:text-slate-300">
          {isLastStep() ? isSubmitting ? 'Processing' : 'Save' : 'Next Step'}
        </button>

      </footer>

    </Form>
  </FormikProvider>
}