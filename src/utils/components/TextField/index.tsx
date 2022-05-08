import { useField, ErrorMessage } from "formik";
import "./index.css";

export const TextField = ({ label, required = false, ...props }: any) => {
	const [field, meta] = useField(props);

	return (
		<div className="flex flex-col py-2 rounded-sm space-y-2">
			<label
				htmlFor={field.name}
				className="text-sm font-semibold text-slate-700"
			>
				{label} {required && <span className="text-red-400">*</span>}
			</label>

			<input
				className="text-sm placeholder-slate-400 bg-neutral-100 font-normal rounded-md outline-none pl-6 pr-6 py-3 email"
				{...field}
				{...props}
				autoComplete="off"
				placeholder={label}
			/>

			<ErrorMessage name={field.name} component="div" className="error" />
		</div>
	);
};
