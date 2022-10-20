import { HeadCell } from "components/HeadCell";
import { InsuranceCompany } from "types/InsuranceCompany"
import { Filter, MetaResponse, Order, OrderBy } from "utils/params/query";
import { InsuranceCompanyRow } from "../Row"
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TableSortLabel, TableHead as MuiTableHead } from "@mui/material";
import { useState, KeyboardEvent } from "react";
import { Search } from "@mui/icons-material";


const headCells: readonly HeadCell<InsuranceCompany>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email_address_1',
    numeric: false,
    disablePadding: false,
    label: 'Email Address #1',
  },
  {
    id: 'email_address_2',
    numeric: false,
    disablePadding: false,
    label: 'Email Address #2',
  },
  {
    id: 'company',
    numeric: false,
    disablePadding: false,
    label: 'Company',
  },
  {
    id: 'street',
    numeric: false,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'zip',
    numeric: false,
    disablePadding: false,
    label: 'Zip',
  },
  {
    id: 'contacts',
    numeric: false,
    disablePadding: false,
    label: 'Contacts',
  },
];

export type TableHeadProps = {
  headCells: readonly HeadCell<InsuranceCompany>[],
  order: Order,
  orderBy: OrderBy<InsuranceCompany>,
  onRequestSort: (property: OrderBy<InsuranceCompany>) => void;
};

function TableHead({ headCells, order, orderBy, onRequestSort }: TableHeadProps) {

  const createSortHandler =
    (property: OrderBy<InsuranceCompany>) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(property);
    };

  return (
    <MuiTableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          Actions
        </TableCell>
      </TableRow>
    </MuiTableHead>
  );
}

type InsuranceCompaniesTableProps = {
  values: InsuranceCompany[],
  order: Order,
  orderBy: OrderBy<InsuranceCompany>,
  filterBy: OrderBy<InsuranceCompany>,
  meta: MetaResponse,
  onSort: (order: Order, orderBy: OrderBy<InsuranceCompany>) => void;
  onFilter: (filter: Filter<InsuranceCompany>) => void;
  onDelete: (client: InsuranceCompany) => void;
  onEdit: (client: InsuranceCompany) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (perPage: number) => void;
}
export const InsuranceCompaniesTable = ({ values: insuranceCompanies, order, orderBy, filterBy, meta, onSort, onFilter, onPageChange, onRowsPerPageChange, onDelete, onEdit }: InsuranceCompaniesTableProps) => {

  const [filter, setFilter] = useState<Filter<InsuranceCompany>>([filterBy, '']);
  const [rowsPerPage] = useState<number>(15);

  const handleRequestSort = (
    property: OrderBy<InsuranceCompany>,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    onSort(isAsc ? 'desc' : 'asc', property)
  };

  const handleFilter = (ev: KeyboardEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;


    if (ev.code === "Enter") {
      onFilter(['company', value])
    }
  }

  const handleChange = (ev: any) => {
    const { value } = ev.target;

    setFilter([filterBy, value])
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage + 1)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(+event.target.value);
  };

  return <Box sx={{ width: '100%' }}>


    <div className="py-6 w-full md:w-auto">
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
        <input type="text" value={filter[1]} onKeyUp={handleFilter} onChange={handleChange} className="w-full md:w-80 text-base rounded-md bg-zinc-100  text-zinc-900 focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Insurance Company" />
      </div>


    </div>

    <TableContainer>
      <Table
        sx={{ minWidth: 750 }}
        aria-labelledby="tableTitle"
        size={false ? 'small' : 'medium'}
      >
        <TableHead
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>

          {
            insuranceCompanies.map((insuranceCompany) => (
              <InsuranceCompanyRow key={insuranceCompany.id} value={insuranceCompany} onDelete={onDelete} onEdit={onEdit} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[15, 20, 25]}
      component="div"
      count={meta.total!}
      rowsPerPage={meta.per_page!}
      page={meta.current_page! - 1}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />


  </Box>

}