import { Client } from "types/Client";

// icons
import { Delete, Edit, QuestionMark } from "@mui/icons-material";

type ClientRowProps = {
  value: Client,
  onDelete: (client: Client) => void;
  onEdit: (client: Client) => void;
};

export const ClientRow = (
  {
    value: client,
    onDelete,
    onEdit
  }: ClientRowProps
) => {

  // handlers
  const handleOnEdit = () => {
    onEdit(client);
  }

  const handleOnDelete = () => {
    onDelete(client);
  }

  return <tr>
    <td className="px-6 py-4">
      {client.person_contact}
    </td>
    <td className="px-6 py-4">
      {client.company}
    </td>
    <td className="px-6 py-4">
      {client.email}
    </td>
    <td className="px-6 py-4">
      {client.street}
    </td>
    <td className="px-6 py-4 text-center">
      {client.zip}
    </td>
    <td className="px-6 py-4 text-center">
      {client.client_status}
    </td>

    {/* ACTIONS */}
    <td className="px-6 py-4 text-center flex justify-center">

      <div className="flex py-2 rounded-full bg-zinc-100 divide-x-2 divide-zinc-200">
        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900">
          <QuestionMark fontSize="inherit" />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={handleOnDelete}>
          <Delete
            fontSize="inherit"
          />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={handleOnEdit}>
          <Edit
            fontSize="inherit"
          />
        </button>
      </div>
    </td>
  </tr>
}