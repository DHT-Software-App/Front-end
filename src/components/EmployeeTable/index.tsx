import "./index.css";
import { Employee } from "types/Employee";
import { EmployeeRow } from "components/EmployeeRow";

export const EmployeeTable = ({
	values: employees,
}: {
	values: Employee[];
}) => {
	return (
		<div className="overflow-auto">
			<table className="w-full text-sm  text-blue-dark">
				<thead>
					<tr className="bg-purple font-semibold px-6 py-2">
						<th className="p-3 font-semibold tracking-wide text-left w-60">
							First Name
						</th>
						<th className="p-3 font-semibold tracking-wide text-left w-60">
							Last Name
						</th>
						<th className="p-3 font-semibold tracking-wide text-left w-60">
							Contact #1
						</th>
						<th className="p-3 font-semibold tracking-wide text-left w-60">
							Contact #2
						</th>
						<th className="p-3 font-semibold tracking-wide text-left w-60">
							Address
						</th>
						<th className="p-3 font-semibold tracking-wide text-left w-60">
							Type
						</th>
						<th className="p-3 font-semibold tracking-wide text-left w-40">
							Status
						</th>
						<th className="p-3 font-semibold tracking-wide text-center w-40">
							Account
						</th>
						<th className="p-3 font-semibold tracking-wide text-center w-64">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-100">
					{employees.map((employee, index) => (
						<EmployeeRow key={index} value={employee} />
					))}
				</tbody>
			</table>
		</div>
	);
};
