import { InsuranceCompany } from "types/InsuranceCompany";
import { Delete, Edit, QuestionMark } from "@mui/icons-material";
import { TableCell, TableRow, styled } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

  return <StyledTableRow>
    <TableCell>
      {insuranceCompany.name}
    </TableCell>
    <TableCell>
      {insuranceCompany.email_address_1}
    </TableCell>
    <TableCell>
      {insuranceCompany.email_address_2}
    </TableCell>
    <TableCell>
      {insuranceCompany.company}
    </TableCell>

    <TableCell>
      {`${insuranceCompany.street}, ${insuranceCompany.city}`}
    </TableCell>

    <TableCell>
      {insuranceCompany.zip}
    </TableCell>

    <TableCell>
      <select disabled={!insuranceCompany.contacts?.length}>
        {
          insuranceCompany.contacts?.map((contact) => <option>{contact}</option>)
        }
      </select>
    </TableCell>


    {/* ACTIONS */}
    <TableCell className="flex">

      <div className="flex py-2">
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
    </TableCell>
  </StyledTableRow>
}