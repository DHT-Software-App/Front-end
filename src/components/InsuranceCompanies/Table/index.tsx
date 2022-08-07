import { InsuranceCompany } from "types/InsuranceCompany"
import { InsuranceCompanyRow } from "../Row"

type InsuranceCompaniesTableProps = {
  values: InsuranceCompany[],
  onDelete: (client: InsuranceCompany) => void;
  onEdit: (client: InsuranceCompany) => void;
}
export const InsuranceCompaniesTable = ({ values: insuranceCompanies, onDelete, onEdit }: InsuranceCompaniesTableProps) => {

  return <div className='overflow-x-auto w-full'>
    <table className='mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-slate-200 overflow-hidden'>
      <thead className="bg-blue-dark">
        <tr className="text-white text-left">
          <th className="font-semibold text-sm uppercase px-6 py-4"> Name </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Email Address #1 </th>
          <th className="font-semibold text-sm uppercase px-6 py-4"> Email Address #2 </th>
          <th className="font-semibold text-sm uppercase px-6 py-4">
            Company
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4">
            Address
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
            Zip
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
            Contacts
          </th>
          <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Actions </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">

        {
          insuranceCompanies.map((insuranceCompany: InsuranceCompany, index: number) =>
            <InsuranceCompanyRow onDelete={onDelete} onEdit={onEdit} value={insuranceCompany} key={index} />
          )
        }
      </tbody>
    </table>
  </div>

}