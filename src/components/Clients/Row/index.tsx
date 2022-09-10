import { Client } from "types/Client";
import { Delete, Edit, QuestionMark } from "@mui/icons-material";

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

  return <tr>
    <td className="px-6 py-4">
      {client.firstname}
    </td>
    <td className="px-6 py-4">
      {client.lastname}
    </td>
    <td className="px-6 py-4">
      {client.email_address_1}
    </td>
    <td className="px-6 py-4">
      {client.email_address_2}
    </td>
    <td className="px-6 py-4">
      {client.company}
    </td>

    <td className="px-6 py-4">
      {`${client.street}, ${client.city}`}
    </td>

    <td className="px-6 py-4 text-center">
      {client.zip}
    </td>

    <td className="px-6 py-4 text-center">
      <select disabled={!client.contacts?.length}>
        {
          client.contacts?.map((contact) => <option>{contact}</option>)
        }
      </select>
    </td>


    {/* ACTIONS */}
    <td className="px-6 py-4 text-center flex justify-center">

      <div className="flex py-2 rounded-full bg-zinc-100 divide-x-2 divide-zinc-200">
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
    </td>
  </tr>
}