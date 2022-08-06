import { Customer } from "types/Customer"
import { CustomerRow } from "../Row"

type CustomersTableProps = {
  values: Customer[],
  onDelete: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
}

export const CustomersTable = ({ values: customers, onDelete, onEdit }: CustomersTableProps) => {
  return <div className='overflow-x-auto w-full'>
    <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-slate-200 overflow-hidden'>
      <thead className="bg-blue-dark">
        <tr className="text-white text-left">
          <th className="font-semibold text-sm uppercase px-6 py-4"> First Name </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Last Name </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Email</th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Street </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Zip </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Actions </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">

        {
          customers.map((customer: Customer, index: number) =>
            <CustomerRow onDelete={onDelete} onEdit={onEdit} value={customer} key={index} />
          )
        }
      </tbody>
    </table>
  </div>

}