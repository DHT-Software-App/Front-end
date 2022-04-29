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

const EnableAccount = () => {
	return (
		<button
			id="enable-account"
			className=" bg-blue-light text-white uppercase text-xs font-semibold px-4 py-2 rounded-sm whitespace-nowrap"
		>
			enable account
		</button>
	);
};

type EmployeeStatus = "active" | "desactive";

const EmployeeStatusBadge = ({
	status,
	...props
}: {
	status?: EmployeeStatus;
}) => {
	const bgStatus = status == "active" ? "green" : "yellow";

	return (
		<span
			className={`p-1.5 text-xs font-medium uppercase 
			tracking-wider rounded-lg bg-opacity-50 text-${bgStatus}-800 bg-${bgStatus}-200`}
		>
			{status}
		</span>
	);
};

export const EmployeeRow = ({ value: employee }: { value: Employee }) => {
	return (
		<tr className="bg-white">
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.first_name}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.last_name}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.contact_1}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.contact_2}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">{`${employee.street}, ${employee.city}`}</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.role?.name}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				<EmployeeStatusBadge status={employee.status} />
			</td>
			<td className="text-center p-3 text-slate-700 whitespace-nowrap">
				{employee.account ? <Avatar /> : <EnableAccount />}
			</td>
			<td className="text-center p-3 text-slate-700 whitespace-nowrap">
				<div className="flex space-x-6">
					<Link to="">
						<FontAwesomeIcon
							icon={faCircleQuestion}
							className="text-lg text-slate-400 hover:text-slate-700"
						/>
					</Link>
					<Link to="">
						<FontAwesomeIcon
							icon={faTrashCan}
							className="text-lg text-slate-400 hover:text-slate-700"
						/>
					</Link>
					<Link to="">
						<FontAwesomeIcon
							icon={faEdit}
							className="text-lg text-slate-400 hover:text-slate-700"
						/>
					</Link>
				</div>
			</td>
		</tr>
	);
};
