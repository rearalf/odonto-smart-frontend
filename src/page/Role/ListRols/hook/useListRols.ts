import { type ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

import useGetListAllRoles from '@features/role/query/useGetListAllRoles';
import useNotificationStore from '@stores/useNotificationStore';

function useListRols() {
  const storeNotification = useNotificationStore();

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search, 1000);

  const { data, refetch, isLoading, isError } = useGetListAllRoles({
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

  const [showCreateRolModal, setshowCreateRolModal] = useState<boolean>(false);

  const handleToggleShowCreateRolModal = (refreshData?: boolean) => {
    setshowCreateRolModal(!showCreateRolModal);
    if (refreshData) refetch();
  };

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
    search,
    isLoading,
    rowsPerPage,
    showCreateRolModal,
    roles: data && data.data ? data.data : [],
    pagination: data && data.pagination ? data.pagination : null,
    handleSetPage,
    handleSearchInput,
    handleClearFilter,
    handleSetRowsPerPage,
    handleToggleShowCreateRolModal,
  };
}

export default useListRols;
