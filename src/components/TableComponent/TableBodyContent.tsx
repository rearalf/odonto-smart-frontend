import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import TableEmptyState from './TableEmptyState';
import type { ITableComponent } from 'src/types/TableComponent.type';

interface ITableBodyContentProps {
  loading: boolean;
  isEmpty: boolean;
  body: ITableComponent['body'];
  headers: ITableComponent['headers'];
  rowsPerPage: number;
  dense?: boolean;
  emptyMessage: string;
}

const TableBodyContent = ({
  loading,
  isEmpty,
  body,
  headers,
  rowsPerPage,
  dense,
  emptyMessage,
}: ITableBodyContentProps) => {
  const getColumnsCount = (): number => {
    if (Array.isArray(headers)) {
      return headers.length;
    }
    return 1;
  };

  const columnsCount = getColumnsCount();

  return (
    <TableBody>
      {loading ? (
        Array.from({ length: rowsPerPage }, (_, index) => (
          <TableRow key={`skeleton-row-${index}`}>
            {Array.from({ length: columnsCount }, (_, index) => (
              <TableCell key={`skeleton-cell-${index}`}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={dense ? 20 : 24}
                  animation="wave"
                />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : isEmpty ? (
        <TableEmptyState emptyMessage={emptyMessage} />
      ) : (
        body
      )}
    </TableBody>
  );
};

export default TableBodyContent;
