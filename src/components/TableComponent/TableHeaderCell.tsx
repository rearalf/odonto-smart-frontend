import {
  Skeleton,
  TableCell,
  TableHead,
  TableRow,
  alpha,
  useTheme,
} from '@mui/material';
import type {
  HeaderObject,
  ITableComponent,
} from 'src/types/TableComponent.type';

interface ITableHeaderProps {
  headers: ITableComponent['headers'];
  loading?: boolean;
  dense?: boolean;
}

const TableHeader = ({ headers, loading, dense }: ITableHeaderProps) => {
  const theme = useTheme();

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

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        {isObjectHeader(headers)
          ? headers.map((header) => (
              <TableCell
                key={header.key}
                align={header.align || 'left'}
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.info.main,
                }}
              >
                {loading ? (
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={dense ? 20 : 24}
                    animation="wave"
                  />
                ) : (
                  header.title
                )}
              </TableCell>
            ))
          : headers}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
