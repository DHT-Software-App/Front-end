import { FormikConfig, FormikValues, Form, useFormik, FormikProvider, FormikContextType } from "formik";
import React, { useState, useEffect } from "react"

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> { }

type FormikStepperProps = {
  children: React.ReactElement<FormikStepProps>[],
  value: FormikContextType<any>
}

export function FormikStep({ children }: FormikStepProps) {
  return <>
    {children}
  </>
}

export function FormikStepper({ children, value }: FormikStepperProps) {
  const childrenArray = React.Children.toArray(children as any) as React.ReactElement<FormikStepProps>[]
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const formikBag = useFormik({
    ...value,
    validationSchema: currentChild.props.validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (isLastStep()) {
        value.setValues({ ...values, ...value.values })
        value.submitForm()
      } else {
        setStep(s => s + 1);
        setSubmitting(false)
      }
    }
  });

  const { isSubmitting, isValid, setErrors, setSubmitting } = formikBag;

  const findIndexPageOfErrorField = (fieldName: string) => {
    return childrenArray.findIndex(({ props: { validationSchema } }) => {
      return validationSchema._nodes.includes(fieldName);
    });
  }
  // Capture errors from outside
  useEffect(() => {
    if (value.errors) {
      setErrors({ ...value.errors })
      const firstFieldName = Object.keys(value.errors)[0]
      firstFieldName && setStep(findIndexPageOfErrorField(firstFieldName))

      setSubmitting(false)
    }
  }, [value.errors]);


  const isLastStep = () => {
    return step === childrenArray.length - 1;
  }


  return <FormikProvider value={formikBag} >
    <Form autoComplete="off">
      <div className="flex flex-col space-y-12 pt-7 pb-14 px-10 ">
        <header className="text-lg font-medium text-center text-zinc-500 border-b border-zinc-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <a href="#" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-zinc-600 hover:border-zinc-300">Profile</a>
            </li>
            <li className="mr-2">
              <a href="#" className="inline-block p-4 text-blue rounded-t-lg border-b-2 border-b-blue active" aria-current="page">Dashboard</a>
            </li>
            <li className="mr-2">
              <a href="#" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-zinc-600 hover:border-zinc-300">Settings</a>
            </li>
            <li className="mr-2">
              <a href="#" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-zinc-600 hover:border-zinc-300">Contacts</a>
            </li>
            <li>
              <a className="inline-block p-4 text-zinc-400 rounded-t-lg cursor-not-allowed dark:text-zinc-500">Disabled</a>
            </li>
          </ul>
        </header>

        <section className="px-3">
          {currentChild}
          <p className="text-sm text-center md:text-left text-slate-400 font-semibold mt-3">
            In order to process registration provide the following
            information. All fields marked with an asterisk (*) are required.
          </p>
        </section>


        <footer className="flex gap-x-4">
          {/* Actions */}
          {
            step > 0 ?
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                disabled={isSubmitting || !isValid}
                className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-zinc-100 disabled:text-zinc-300">
                Back Step
              </button> : null
          }

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="bg-blue text-white text-base w-full md:w-auto font-semibold px-5 py-3 disabled:bg-zinc-100 disabled:text-zinc-300">
            {isLastStep() ? isSubmitting ? 'Processing' : 'Save' : 'Next Step'}
          </button>

        </footer>
      </div>
    </Form>
  </FormikProvider >
}