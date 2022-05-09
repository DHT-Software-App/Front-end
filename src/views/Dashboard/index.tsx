import { EmployeeForm } from "components/EmployeeForm";
import { FileSelector } from "components/FileSelector";

export const DashboardView = () => {
	return (
		<div className="flex items-center justify-content">
			<FileSelector multiple />
		</div>
	);
};
