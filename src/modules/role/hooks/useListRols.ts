import { type ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

import useNotificationStore from '@stores/useNotificationStore';
import { useGetListAllRoles } from './useRolQueries';

function useListRols() {
  const theme = useTheme();
  const navigate = useNavigate();
  const storeNotification = useNotificationStore();

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search, 1000);

  const { data, isLoading, isError } = useGetListAllRoles({
    pagination: true,
    page: page,
    per_page: rowsPerPage,
    search: debouncedSearch,
  });

  const handleSetPage = (newPage: number) => setPage(newPage);

  const handleSetRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleClearFilter = () => setSearch('');

  const handleGoToCreateRol = () => navigate('/rol/new-rol');

  useEffect(() => {
    if (isError) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al cargar los datos',
      });
    }
  }, [isError, storeNotification]);

  return {
    page,
    theme,
    search,
    isLoading,
    rowsPerPage,
    roles: data && data.data ? data.data : [],
    pagination: data && data.pagination ? data.pagination : null,
    handleSetPage,
    handleSearchInput,
    handleClearFilter,
    handleGoToCreateRol,
    handleSetRowsPerPage,
  };
}

export default useListRols;
