import { InsuranceCompany } from "types/InsuranceCompany";
import { Delete, Edit, QuestionMark } from "@mui/icons-material";

type InsuranceCompanyRowProps = {
  value: InsuranceCompany;
  onEdit: (insuranceCompany: InsuranceCompany) => void;
  onDelete: (insuranceCompany: InsuranceCompany) => void;
};


export const InsuranceCompanyRow = ({
  value: insuranceCompany,
  onEdit,
  onDelete,
}: InsuranceCompanyRowProps
) => {

  return <tr>
    <td className="px-6 py-4">
      {insuranceCompany.name}
    </td>
    <td className="px-6 py-4">
      {insuranceCompany.email_address_1}
    </td>
    <td className="px-6 py-4">
      {insuranceCompany.email_address_2}
    </td>
    <td className="px-6 py-4">
      {insuranceCompany.company}
    </td>

    <td className="px-6 py-4">
      {`${insuranceCompany.street}, ${insuranceCompany.city}`}
    </td>

    <td className="px-6 py-4 text-center">
      {insuranceCompany.zip}
    </td>

    <td className="px-6 py-4 text-center">
      {/* {insuranceCompany.contacts} */}
    </td>


    {/* ACTIONS */}
    <td className="px-6 py-4 text-center flex justify-center">

      <div className="flex py-2 rounded-full bg-zinc-100 divide-x-2 divide-zinc-200">
        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900">
          <QuestionMark fontSize="inherit" />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onDelete(insuranceCompany)}>
          <Delete
            fontSize="inherit"
          />
        </button>

        <button className="text-lg  text-zinc-600 px-4 hover:text-zinc-900" onClick={() => onEdit(insuranceCompany)}>
          <Edit
            fontSize="inherit"
          />
        </button>
      </div>
    </td>
  </tr>
}