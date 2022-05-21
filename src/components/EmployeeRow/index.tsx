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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EnableAccount = () => {
	const dispatch = useDispatch();

	const { auth: token } = useSelector(({ auth }: any) => auth);

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
};

export const EmployeeRow = ({ value: employee, onEdit }: EmployeeRowProps) => {
	return (
		<tr className="bg-white border-b-2 border-slate-100">
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.firstname}
			</td>
			<td className="p-3 text-slate-700 whitespace-nowrap">
				{employee.lastname}
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
				{employee.user ? <Avatar /> : <EnableAccount />}
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
					<button onClick={() => onEdit(employee)}>
						<FontAwesomeIcon
							icon={faEdit}
							className="text-lg text-slate-400 hover:text-slate-700"
						/>
					</button>
				</div>
			</td>
		</tr>
	);
};
