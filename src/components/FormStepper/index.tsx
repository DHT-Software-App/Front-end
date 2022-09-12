import { FormikConfig, FormikValues, Form, useFormik, FormikProvider, FormikContextType } from "formik";
import React, { useState, useEffect } from "react"

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  title: string
}

type FormikStepperProps = {
  children: React.ReactElement<FormikStepProps>[],
  value: FormikContextType<any>
}

type FormikStepTabProps = {
  active?: boolean,
  disable?: boolean,
  children?: string
}

type FormikStepTabsProps = {
  children?: React.ReactElement<FormikStepTabProps>[]
}

function FormikStepTab({ active = false, disable = false, children }: FormikStepTabProps) {

  return <a className={`select-none inline-block p-4 rounded-t-lg opacity-100
     ${active && "text-blue border-b-blue border-b-2"}
    ${disable && "opacity-30"}
    `}>
    {children}
  </a>
}

function FormikStepTabs({ children }: FormikStepTabsProps) {
  return <header className="text-lg font-medium text-center text-zinc-500 border-b border-zinc-200">
    <ul className="flex flex-wrap -mb-px">
      {children}
    </ul>
  </header>
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
  const stepTabTitles = childrenArray.map((c) => c.props.title);

  const formikBag = useFormik({
    ...value,
    validationSchema: currentChild.props.validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (isLastStep()) {
        value.setValues({ ...value.values, ...values })
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
        <FormikStepTabs>
          {
            stepTabTitles.map((title: string, index: number) => (
              <FormikStepTab
                key="index"
                active={currentChild.props.title == title}
                disable={!isValid}
              >
                {title}
              </FormikStepTab>
            ))
          }
        </FormikStepTabs>

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