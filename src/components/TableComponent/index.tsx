import { alpha, Table, Paper, useTheme, TableContainer } from '@mui/material';
import { memo } from 'react';

import type { ITableComponent } from 'src/types/TableComponent.type';

import TablePaginationFooter from './TablePaginationFooter';
import TableBodyContent from './TableBodyContent';
import TableHeader from './TableHeaderCell';

const TableComponent = memo((props: ITableComponent) => {
  const theme = useTheme();
  const {
    loading = false,
    rowsPerPage = 10,
    emptyMessage = 'No hay datos disponibles',
    handleSetPage,
    handleSetRowsPerPage,
  } = props;

  const isEmpty = props.totalData === 0 && !loading;
  const shouldShowPagination =
    props.totalData > 0 && props.pagination && !loading;

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
        <TableHeader
          headers={props.headers}
          loading={loading}
          dense={props.dense}
        />

        <TableBodyContent
          loading={loading}
          isEmpty={isEmpty}
          body={props.body}
          headers={props.headers}
          rowsPerPage={rowsPerPage}
          dense={props.dense}
          emptyMessage={emptyMessage}
        />

        {shouldShowPagination && (
          <TablePaginationFooter
            totalData={props.totalData}
            page={props.page}
            rowsPerPage={props.rowsPerPage}
            onSetPage={handleSetPage}
            onSetRowsPerPage={handleSetRowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
});

TableComponent.displayName = 'TableComponent';

export default TableComponent;
