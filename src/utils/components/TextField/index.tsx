import { useField, ErrorMessage } from "formik";
import "./index.css";

export const TextField = ({ label, ...props }: any) => {
	const [field, meta] = useField(props);

	return (
		<div className="flex flex-col py-2 rounded-sm">
			<label htmlFor={field.name} className="text-sm font-bold text-gray-600">
				{label}
			</label>

			<input
				className={`my-2 border-2 outline-none p-2 rounded-sm email ${
					meta.touched && meta.error && "is-invalid"
				}`}
				{...field}
				{...props}
				autoComplete="off"
			/>

			<ErrorMessage name={field.name} component="div" className="error" />
		</div>
	);
};
