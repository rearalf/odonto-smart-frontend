import { Box, TableCell, TableRow, Typography, useTheme } from '@mui/material';

const TableEmptyState = ({ emptyMessage }: { emptyMessage: string }) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell colSpan={100}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(4),
            minHeight: 200,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {emptyMessage}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableEmptyState;
