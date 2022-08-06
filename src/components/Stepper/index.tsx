import { StepperItem, StepperItemProps } from "../StepperItem";

interface StepperProps {
  children:
  | React.ReactElement<StepperItemProps>
  | React.ReactElement<StepperItemProps>[];
}

//bg-slate-200
export const Stepper = ({ children }: StepperProps) => {
  return (
    <div className="h-full mx-auto px-4 max-w-screen-lg flex flex-col md:flex-row justify-center md:items-center gap-12">
      {children}
    </div>
  );
};