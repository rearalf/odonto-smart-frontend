import TablePaginationActions from './TablePaginationActions';
import {
  Table,
  Paper,
  TableRow,
  TableHead,
  TableBody,
  TableFooter,
  TableContainer,
  TablePagination,
} from '@mui/material';

import type { ReactNode } from 'react';

interface ITableComponent {
  page: number;
  body: ReactNode;
  header: ReactNode;
  totalData: number;
  rowsPerPage: number;
  ariaLabelTable: string;
  handleSetPage: (value: number) => void;
  handleSetRowsPerPage: (value: number) => void;
}

const TableComponent = (props: ITableComponent) => {
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => props.handleSetPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = parseInt(event.target.value, 10);
    props.handleSetPage(0);
    props.handleSetRowsPerPage(value);
  };

  const slotPropsConst = {
    select: {
      inputProps: {
        'aria-label': 'Filas por página',
      },
      native: true,
    },
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label={props.ariaLabelTable}>
        <TableHead>
          <TableRow>{props.header}</TableRow>
        </TableHead>
        <TableBody>{props.body}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={props.page}
              count={props.totalData}
              slotProps={slotPropsConst}
              rowsPerPage={props.rowsPerPage}
              onPageChange={handleChangePage}
              labelRowsPerPage="Filas por página:"
              ActionsComponent={TablePaginationActions}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
