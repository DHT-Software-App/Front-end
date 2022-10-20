import { useState, KeyboardEvent } from "react"
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TableSortLabel, TableHead as MuiTableHead } from "@mui/material";
import { HeadCell } from "components/HeadCell";
import { Client } from "types/Client"
import { ClientRow } from "../Row"
import { Filter, MetaResponse, Order, OrderBy } from "utils/params/query";
import { Search } from "@mui/icons-material";


const headCells: readonly HeadCell<Client>[] = [
  {
    id: 'firstname',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'lastname',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
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
  headCells: readonly HeadCell<Client>[],
  order: Order,
  orderBy: OrderBy<Client>,
  onRequestSort: (property: OrderBy<Client>) => void;
};

function TableHead({ headCells, order, orderBy, onRequestSort }: TableHeadProps) {

  const createSortHandler =
    (property: OrderBy<Client>) => (event: React.MouseEvent<unknown>) => {
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


type ClientsTableProps = {
  values: Client[],
  order: Order,
  orderBy: OrderBy<Client>,
  filterBy: OrderBy<Client>,
  meta: MetaResponse,
  onSort: (order: Order, orderBy: OrderBy<Client>) => void;
  onFilter: (filter: Filter<Client>) => void;
  onDelete: (client: Client) => void;
  onEdit: (client: Client) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (perPage: number) => void;

}

export const ClientsTable = ({ values: clients, order, orderBy, filterBy, meta, onSort, onFilter, onPageChange, onRowsPerPageChange, onDelete, onEdit }: ClientsTableProps) => {

  const [filter, setFilter] = useState<Filter<Client>>([filterBy, '']);
  const [rowsPerPage] = useState<number>(15);

  const handleRequestSort = (
    property: OrderBy<Client>,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    onSort(isAsc ? 'desc' : 'asc', property)
  };

  const handleFilter = (ev: KeyboardEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    

    if (ev.code === "Enter") {
      onFilter(['firstname', value])
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
        <input type="text" value={filter[1]} onKeyUp={handleFilter} onChange={handleChange} className="w-full md:w-80 text-base rounded-md bg-zinc-100  text-zinc-900 focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for clients" />
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
            clients.map((client) => (
              <ClientRow key={client.id} value={client} onDelete={onDelete} onEdit={onEdit} />
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