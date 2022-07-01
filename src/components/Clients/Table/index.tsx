import { Client } from "types/Client";
import { ClientRow } from "../Row";

type ClientsTableProps = {
  values: Client[],
  onDelete: (customer: Client) => void;
  onEdit: (customer: Client) => void;
}

export const ClientsTable = ({ values: clients, onDelete, onEdit }: ClientsTableProps) => {
  return <div className='overflow-x-auto w-full'>
    <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-slate-200 overflow-hidden'>
      <thead className="bg-blue-dark">
        <tr className="text-white text-left">
          <th className="font-semibold text-sm uppercase px-6 py-4"> Person Contact </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Company </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Email</th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Street </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Zip </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Status </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Actions </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">

        {
          clients.map((client: Client, index: number) =>
            <ClientRow onDelete={onDelete} onEdit={onEdit} value={client} key={index} />
          )
        }
      </tbody>
    </table>
  </div>
} 