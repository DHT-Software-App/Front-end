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

  return <div className='overflow-x-auto w-full'>
    <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-slate-200 overflow-hidden'>
      <thead className="bg-blue-dark">
        <tr className="text-white text-left">
          <th className="font-semibold text-sm uppercase px-6 py-4">
            First Name
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4">
            Last Name
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4">
            Contacts
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4">
            Address
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4">
            Type
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
            Status
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
            Account
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">

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