import { Customer } from "types/Customer";

// icons
import { Delete, Edit, QuestionMark } from "@mui/icons-material";

type CustomerRowProps = {
  value: Customer,
  onDelete: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
};

export const CustomerRow = (
  {
    value: customer,
    onDelete,
    onEdit
  }: CustomerRowProps
) => {

  // handlers
  const handleOnEdit = () => {
    onEdit(customer);
  }

  const handleOnDelete = () => {
    onDelete(customer);
  }

  return <tr>
    <td className="px-6 py-4">
      {customer.first_name}
    </td>
    <td className="px-6 py-4">
      {customer.last_name}
    </td>
    <td className="px-6 py-4">
      {customer.email}
    </td>
    <td className="px-6 py-4">
      {customer.street}
    </td>
    <td className="px-6 py-4 text-center">
      {customer.zip}
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