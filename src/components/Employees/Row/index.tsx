import { Employee } from "types/Employee";

// icons
import { Delete, Edit, QuestionMark } from "@mui/icons-material";
import { TableCell, TableRow, styled } from "@mui/material";
import { ResendConfirmation } from "components/ResendConfirmation";
import { Avatar } from "components/Avatar";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
    <TableCell >
      {employee.firstname}
    </TableCell>
    <TableCell >
      {employee.lastname}
    </TableCell>
    <TableCell >
      {`${employee.street}, ${employee.city}`}
    </TableCell>
    <TableCell >
      {employee.role?.name}
    </TableCell>
    <TableCell >
      <select disabled={!employee.contacts?.length}>
        {
          employee.contacts?.map((contact) => <option>{contact}</option>)
        }
      </select>
    </TableCell>
    <TableCell >
      <EmployeeStatusBadge status={employee.status} />
    </TableCell>
    <TableCell >
      {employee.user &&
        (employee.user?.email_verified_at ? (
          <Avatar className="h-8" />
        ) : (
          <ResendConfirmation to={employee.user?.email!} />
        ))}

    </TableCell>

    {/* ACTIONS */}
    <TableCell className="flex">

      <div className="flex py-2">
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
    </TableCell>
  </tr>


}