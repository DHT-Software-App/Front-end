// Employee Type
import { Employee } from "types/Employee";
import { EmployeeRow } from "../Row";

// for test

type EmployeeTableProps = {
  values: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export const EmployeeTable = ({
  values: employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) => {

  return <div className="overflow-auto">
    <table className="w-full text-sm  text-blue-dark">
      <thead>
        <tr className="bg-purple font-semibold px-6 py-2">
          <th className="p-3 font-semibold tracking-wide text-left whitespace-nowrap">
            First Name
          </th>
          <th className="p-3 font-semibold tracking-wide text-left whitespace-nowrap">
            Last Name
          </th>
          <th className="p-3 font-semibold tracking-wide text-left whitespace-nowrap">
            Contact #1
          </th>
          <th className="p-3 font-semibold tracking-wide text-left whitespace-nowrap">
            Contact #2
          </th>
          <th className="p-3 font-semibold tracking-wide text-left whitespace-nowrap">
            Address
          </th>
          <th className="p-3 font-semibold tracking-wide text-left whitespace-nowrap">
            Type
          </th>
          <th className="p-3 font-semibold tracking-wide text-center whitespace-nowrap">
            Status
          </th>
          <th className="p-3 font-semibold tracking-wide text-center whitespace-nowrap">
            Account
          </th>
          <th className="p-3 font-semibold tracking-wide text-center whitespace-nowrap">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {employees.map((employee, index) => (
          <EmployeeRow
            key={index}
            value={employee}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
}