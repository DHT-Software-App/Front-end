import "./index.css";
import { Employee } from "types/Employee";
import { Avatar } from "components/Avatar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrashCan,
	faEdit,
	faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";

import { ResendConfirmation } from "components/ResendConfirmation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type EmployeeStatus = "active" | "desactive";

const EmployeeStatusBadge = ({
	status,
	...props
}: {
	status?: EmployeeStatus;
}) => {
	return (
		<span
			className={`p-1.5 text-xs font-medium uppercase 
		tracking-wider rounded-lg bg-opacity-50 
		${
			status == "active"
				? "text-green-800 bg-green-200"
				: "text-yellow-800 bg-yellow-200"
		} 
		`}
		>
			{status}
		</span>
	);
};

type EmployeeRowProps = {
	value: Employee;
	onEdit: (employee: Employee) => void;
	onDelete: (employee: Employee) => void;
};

export const EmployeeRow = ({
	value: employee,
	onEdit,
	onDelete,
}: EmployeeRowProps) => {
	return (
		<tr className="bg-white border-b-2 border-slate-100">
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.firstname || <Skeleton />}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.lastname || <Skeleton />}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.contact_1 || <Skeleton />}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.contact_2 || <Skeleton />}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.street ? (
					`${employee.street}, ${employee.city}`
				) : (
					<Skeleton />
				)}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.role?.name || <Skeleton />}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.status ? (
					<EmployeeStatusBadge status={employee.status} />
				) : (
					<Skeleton />
				)}
			</td>
			<td className="flex justify-center p-3  text-slate-700 whitespace-nowrap">
				{employee.id ? (
					employee.user &&
					(employee.user.email_verified_at ? (
						<Avatar className="h-8" />
					) : (
						<ResendConfirmation to={employee.user.email!} />
					))
				) : (
					<Skeleton />
				)}
			</td>
			<td className="text-center p-3 text-slate-700 whitespace-nowrap">
				<div className="flex space-x-6">
					{employee.id ? (
						<Link to="">
							<FontAwesomeIcon
								icon={faCircleQuestion}
								className="text-lg text-slate-400 hover:text-slate-700"
							/>
						</Link>
					) : (
						<Skeleton />
					)}

					{employee.id ? (
						<button onClick={() => onDelete(employee)}>
							<FontAwesomeIcon
								icon={faTrashCan}
								className="text-lg text-slate-400 hover:text-slate-700"
							/>
						</button>
					) : (
						<Skeleton />
					)}

					{employee.id ? (
						<button onClick={() => onEdit(employee)}>
							<FontAwesomeIcon
								icon={faEdit}
								className="text-lg text-slate-400 hover:text-slate-700"
							/>
						</button>
					) : (
						<Skeleton />
					)}
				</div>
			</td>
		</tr>
	);
};
