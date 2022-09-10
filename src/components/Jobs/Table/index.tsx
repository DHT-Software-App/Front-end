import { Job } from "types/Job"
import { JobRow } from "../Row"

type JobsTableProps = {
  values: Job[],
  onDelete: (client: Job) => void;
  onEdit: (client: Job) => void;
}

export const JobsTable = ({ values: clients, onDelete, onEdit }: JobsTableProps) => {


  return <div className='overflow-x-auto w-full'>
    <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-slate-200 overflow-hidden'>
      <thead className="bg-blue-dark">
        <tr className="text-white text-left">
          <th className="font-semibold text-sm uppercase px-6 py-4"> Date of Loss </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Type Of Loss </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Customer </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Work Type </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
            Address
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
            Status
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Actions </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">

        {
          clients.map((client: Job, index: number) =>
            <JobRow onDelete={onDelete} onEdit={onEdit} value={client} key={index} />
          )
        }
      </tbody>
    </table>
  </div>

}