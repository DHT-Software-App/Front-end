import { Customer } from "types/Customer";
import { Delete, Edit, QuestionMark } from "@mui/icons-material";
import { TableCell, TableRow, styled } from "@mui/material";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type CustomerRowProps = {
  value: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

export const CustomerRow = ({
  value: customer,
  onEdit,
  onDelete,
}: CustomerRowProps
) => {
  return <tr>
    <TableCell>
      {customer.firstname}
    </TableCell>
    <TableCell>
      {customer.lastname}
    </TableCell>
    <TableCell>
      {customer.insured_firstname}
    </TableCell>
    <TableCell>
      {customer.insured_lastname}
    </TableCell>
    <TableCell>
      {customer.email_address}
    </TableCell>

    <TableCell>
      {`${customer.street}, ${customer.city}`}
    </TableCell>

    <TableCell>
      {customer.zip}
    </TableCell>

    <TableCell>
      <select disabled={!customer.contacts?.length}>
        {
          customer.contacts?.map((contact) => <option>{contact}</option>)
        }
      </select>
    </TableCell>


    {/* ACTIONS */}
    <TableCell className="flex">

      <div className="flex py-2 ">
        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900">
          <QuestionMark fontSize="inherit" />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onDelete(customer)}>
          <Delete
            fontSize="inherit"
          />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onEdit(customer)}>
          <Edit
            fontSize="inherit"
          />
        </button>
      </div>
    </TableCell>

  </tr>
}