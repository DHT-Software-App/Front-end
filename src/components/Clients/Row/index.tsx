import { Client } from "types/Client";
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

type ClientRowProps = {
  value: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
};

export const ClientRow = ({
  value: client,
  onEdit,
  onDelete,
}: ClientRowProps
) => {

  return <StyledTableRow>
    <TableCell >
      {client.firstname}
    </TableCell>
    <TableCell >
      {client.lastname}
    </TableCell>
    <TableCell>
      {client.email_address_1}
    </TableCell>
    <TableCell >
      {client.email_address_2}
    </TableCell>
    <TableCell>
      {client.company}
    </TableCell>

    <TableCell >
      {`${client.street}, ${client.city}`}
    </TableCell>

    <TableCell >
      {client.zip}
    </TableCell>

    <TableCell >
      <select disabled={!client.contacts?.length}>
        {
          client.contacts?.map((contact) => <option>{contact}</option>)
        }
      </select>
    </TableCell>


    {/* ACTIONS */}
    <TableCell className="flex">

      <div className="flex py-2 ">
        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900">
          <QuestionMark fontSize="inherit" />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onDelete(client)}>
          <Delete
            fontSize="inherit"
          />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onEdit(client)}>
          <Edit
            fontSize="inherit"
          />
        </button>
      </div>
    </TableCell>
  </StyledTableRow>
}