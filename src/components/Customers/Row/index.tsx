import { Customer } from "types/Customer";

type CustomerRowProps = {
  value: Customer,
  onDelete: (id: number) => void;
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
    onDelete(customer.id!);
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
    <td className="px-6 py-4 text-center">

      <button onClick={handleOnDelete}>Delete</button>
      <button onClick={handleOnEdit}>Edit</button>
    </td>
  </tr>
}