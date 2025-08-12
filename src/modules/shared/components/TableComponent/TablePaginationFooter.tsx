import { useCallback } from 'react';
import { TableFooter, TableRow, TablePagination } from '@mui/material';
import TablePaginationActions from './TablePaginationActions';

interface ITablePaginationFooterProps {
  totalData: number;
  page: number;
  rowsPerPage: number;
  onSetPage: (page: number) => void;
  onSetRowsPerPage: (rowsPerPage: number) => void;
}

const TablePaginationFooter = ({
  totalData,
  page,
  rowsPerPage,
  onSetPage,
  onSetRowsPerPage,
}: ITablePaginationFooterProps) => {
  const handleChangePage = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) =>
      onSetPage(newPage + 1),
    [onSetPage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = parseInt(event.target.value, 10);
      onSetPage(0);
      onSetRowsPerPage(value);
    },
    [onSetPage, onSetRowsPerPage],
  );

  const slotProps = {
    select: {
      inputProps: {
        'aria-label': 'Filas por página',
      },
      native: true,
    },
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          component="td"
          page={Math.max(0, page - 1)}
          count={totalData}
          slotProps={slotProps}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          labelRowsPerPage="Filas por página:"
          ActionsComponent={TablePaginationActions}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </TableRow>
    </TableFooter>
  );
};

export default TablePaginationFooter;
