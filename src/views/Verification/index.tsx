import { Stepper } from "utils/components/Stepper";
import { StepperItem } from "utils/components/StepperItem";

export const Verification = () => {
	return (
		<div className="h-screen">
			<Stepper>
				<StepperItem
					title="Verified token"
					description="Your token was valid."
					checked
				/>
				<StepperItem
					title="Invalid email"
					description="Your email must be valid."
					checked
					invalid
				/>
				<StepperItem
					title="Establish new password"
					description="You will establish a new password."
				/>
			</Stepper>
		</div>
	);
};
