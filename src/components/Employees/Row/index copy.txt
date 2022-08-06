import { Employee } from "types/Employee";

// icons
import { Delete, Edit, QuestionMark } from "@mui/icons-material";

const EmployeeStatusBadge = ({
  status
}: {
  status?: boolean;
}) => {
  return (
    <span
      className={`p-1.5 text-xs font-medium uppercase 
		tracking-wider rounded-lg bg-opacity-50 
		${status
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
  return <tr className="bg-white border-b-2 border-slate-100">
    <td className="p-3 text-slate-700 whitespace-nowrap">
      {employee.firstname}
    </td>
    <td className="p-3 text-slate-700 whitespace-nowrap">
      {employee.lastname}
    </td>
    <td className="p-3 text-slate-700 whitespace-nowrap">
      {/* {employee.contact_1} */}
    </td>
    <td className="p-3 text-slate-700 whitespace-nowrap">
      {/* {employee.contact_2} */}
    </td>
    <td className="p-3 text-slate-700 whitespace-nowrap">
      {employee.street}
    </td>
    <td className="p-3 text-slate-700 whitespace-nowrap">
      {/* {employee.role?.name} */}
    </td>
    <td className="p-3 text-slate-700 whitespace-nowrap">
      <EmployeeStatusBadge status={employee.employee_status} />
    </td>
    <td className="flex justify-center p-3  text-slate-700 whitespace-nowrap">

      {/* <ResendConfirmation to={employee.user.email!} /> */}

    </td>
    <td className="text-center p-3 text-slate-700 whitespace-nowrap">
      <div className="flex space-x-6">
        <button className="text-3xl">
          <QuestionMark fontSize="inherit" className="text-slate-400 hover:text-slate-700" />
        </button>

        <button className="text-3xl" onClick={() => onDelete(employee)}>
          <Delete
            fontSize="inherit" className="text-slate-400 hover:text-slate-700"
          />
        </button>

        <button className="text-3xl" onClick={() => onEdit(employee)}>
          <Edit
            fontSize="inherit" className="text-slate-400 hover:text-slate-700"
          />
        </button>
      </div>
    </td>
  </tr>



}