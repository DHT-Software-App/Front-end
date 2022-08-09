import { Customer } from "types/Customer";
import { Delete, Edit, QuestionMark } from "@mui/icons-material";

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
    <td className="px-6 py-4">
      {customer.firstname}
    </td>
    <td className="px-6 py-4">
      {customer.lastname}
    </td>
    <td className="px-6 py-4">
      {customer.insured_firstname}
    </td>
    <td className="px-6 py-4">
      {customer.insured_lastname}
    </td>
    <td className="px-6 py-4">
      {customer.email_address}
    </td>

    <td className="px-6 py-4">
      {`${customer.street}, ${customer.city}`}
    </td>

    <td className="px-6 py-4 text-center">
      {customer.zip}
    </td>

    <td className="px-6 py-4 text-center">
      <select disabled={!customer.contacts?.length}>
        {
          customer.contacts?.map((contact) => <option>{contact}</option>)
        }
      </select>
    </td>


    {/* ACTIONS */}
    <td className="px-6 py-4 text-center flex justify-center">

      <div className="flex py-2 rounded-full bg-zinc-100 divide-x-2 divide-zinc-200">
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
    </td>

  </tr>
}