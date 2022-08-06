import { Employee } from "types/Employee";

// icons
import { Delete, Edit, QuestionMark } from "@mui/icons-material";
import { ResendConfirmation } from "components/ResendConfirmation";
import { Avatar } from "components/Avatar";

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
		${status == "active"
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

  return <tr>
    <td className="px-6 py-4">
      {employee.firstname}
    </td>
    <td className="px-6 py-4">
      {employee.lastname}
    </td>
    <td className="px-6 py-4">
      {/* {employee.contacts} */}
    </td>
    <td className="px-6 py-4">
      {`${employee.street}, ${employee.city}`}
    </td>
    <td className="px-6 py-4">
      {employee.role?.name}
    </td>
    <td className="px-6 py-4 text-center">
      <EmployeeStatusBadge status={employee.status} />
    </td>
    <td className="px-6 py-4 text-center">
      {employee.user &&
        (employee.user?.email_verified_at ? (
          <Avatar className="h-8" />
        ) : (
          <ResendConfirmation to={employee.user?.email!} />
        ))}

    </td>

    {/* ACTIONS */}
    <td className="px-6 py-4 text-center flex justify-center">

      <div className="flex py-2 rounded-full bg-zinc-100 divide-x-2 divide-zinc-200">
        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900">
          <QuestionMark fontSize="inherit" />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onDelete(employee)}>
          <Delete
            fontSize="inherit"
          />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onEdit(employee)}>
          <Edit
            fontSize="inherit"
          />
        </button>
      </div>
    </td>
  </tr>


}