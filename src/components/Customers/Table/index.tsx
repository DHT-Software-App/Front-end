import { Customer } from "types/Customer"
import { CustomerRow } from "../Row"

type CustomersTableProps = {
  values: Customer[],
  onDelete: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
}

export const CustomersTable = ({ values: customers, onDelete, onEdit }: CustomersTableProps) => {
  return <div ></div>

}