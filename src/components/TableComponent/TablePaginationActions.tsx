import { Box, IconButton } from '@mui/material';
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';

interface ITablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const TablePaginationActions = (props: ITablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        disabled={page === 0}
        title="Primera página"
        aria-label="Primera página"
        onClick={handleFirstPageButtonClick}
      >
        <LuChevronFirst title="Primera página" />
      </IconButton>
      <IconButton
        disabled={page === 0}
        title="Página previa"
        aria-label="Página previa"
        onClick={handleBackButtonClick}
      >
        <LuChevronLeft title="Página previa" />
      </IconButton>
      <IconButton
        title="Siguiente página"
        aria-label="Siguiente página"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LuChevronRight title="Siguiente página" />
      </IconButton>
      <IconButton
        title="Última página"
        aria-label="Última página"
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LuChevronLast title="Última página" />
      </IconButton>
    </Box>
  );
};

export default TablePaginationActions;
