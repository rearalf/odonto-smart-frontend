import { memo, useCallback } from 'react';
import {
  alpha,
  Table,
  Paper,
  useTheme,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TableContainer,
  TablePagination,
} from '@mui/material';

import TablePaginationActions from './TablePaginationActions';
import type {
  HeaderObject,
  ITableComponent,
} from 'src/types/TableComponent.type';
import TableEmptyState from './TableEmptyState';

const TableComponent = memo((props: ITableComponent) => {
  const theme = useTheme();
  const {
    handleSetPage,
    handleSetRowsPerPage,
    emptyMessage = 'No hay datos disponibles',
  } = props;

  const isObjectHeader = (
    headers: ITableComponent['headers'],
  ): headers is HeaderObject[] => {
    return (
      Array.isArray(headers) &&
      headers.length > 0 &&
      headers[0] != null &&
      typeof headers[0] === 'object' &&
      'title' in headers[0] &&
      'key' in headers[0]
    );
  };

  const handleChangePage = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) =>
      handleSetPage(newPage + 1),
    [handleSetPage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = parseInt(event.target.value, 10);
      handleSetPage(0);
      handleSetRowsPerPage(value);
    },
    [handleSetPage, handleSetRowsPerPage],
  );

  const slotPropsConst = {
    select: {
      inputProps: {
        'aria-label': 'Filas por página',
      },
      native: true,
    },
  };

  const isEmpty = props.totalData === 0 && !props.loading;

  return (
    <TableContainer
      component={Paper}
      className={props.className}
      sx={{
        maxHeight: props.maxHeight,
        ...(props.maxHeight && { overflow: 'auto' }),
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 2,
      }}
    >
      <Table
        sx={{ minWidth: 500 }}
        aria-label={props.ariaLabelTable}
        size={props.dense ? 'small' : 'medium'}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            {isObjectHeader(props.headers)
              ? props.headers.map((header) => (
                  <TableCell
                    key={header.key}
                    align={header.align || 'left'}
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.info.main,
                    }}
                  >
                    {header.title}
                  </TableCell>
                ))
              : props.headers}
          </TableRow>
        </TableHead>

        <TableBody>
          {isEmpty ? (
            <TableEmptyState emptyMessage={emptyMessage}></TableEmptyState>
          ) : (
            props.body
          )}
        </TableBody>
        {props.totalData > 0 && props.pagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                component="td"
                page={Math.max(0, props.page - 1)}
                count={props.totalData}
                slotProps={slotPropsConst}
                rowsPerPage={props.rowsPerPage}
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
        )}
      </Table>
    </TableContainer>
  );
});

TableComponent.displayName = 'TableComponent';

export default TableComponent;
