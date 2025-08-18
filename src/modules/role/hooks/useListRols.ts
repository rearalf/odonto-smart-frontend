import { type ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

import useNotificationStore from '@stores/useNotificationStore';
import { useDeleteRole, useGetListAllRoles } from './useRolQueries';

function useListRols() {
  const theme = useTheme();
  const navigate = useNavigate();
  const storeNotification = useNotificationStore();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [idRole, setIdRole] = useState<null | number>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search, 1000);

  const { data, isLoading, isError, refetch } = useGetListAllRoles({
    pagination: true,
    page: page,
    per_page: rowsPerPage,
    search: debouncedSearch,
  });

  const { mutate: deletedService } = useDeleteRole();

  const handleSetPage = (newPage: number) => setPage(newPage);

  const handleSetRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleClearFilter = () => setSearch('');

  const handleGoToCreateRol = () => navigate('/rol/new-rol');

  const handleShowDeleteModal = (id?: number) => {
    if (id !== undefined && typeof id === 'number') setIdRole(id);
    else setIdRole(null);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleDeleteRole = () => {
    if (idRole !== null) {
      deletedService(idRole, {
        onSuccess: () => {
          storeNotification.handleShowNotification({
            severity: 'success',
            show: true,
            text: 'Rol eliminado correctamente',
          });
          setOpenDeleteModal(false);
          setIdRole(null);
          refetch();
        },
        onError: (data) => {
          storeNotification.handleShowNotification({
            severity: 'error',
            show: true,
            text: (data && data.message) || 'Error al eliminar el rol',
          });
        },
      });
    } else {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'No se ha seleccionado un rol para eliminar',
      });
      setOpenDeleteModal(false);
      setIdRole(null);
    }
    handleShowDeleteModal();
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
    theme,
    search,
    isLoading,
    rowsPerPage,
    openDeleteModal,
    roles: data && data.data ? data.data : [],
    pagination: data && data.pagination ? data.pagination : null,
    handleSetPage,
    handleSearchInput,
    handleClearFilter,
    handleDeleteRole,
    handleGoToCreateRol,
    handleSetRowsPerPage,
    handleShowDeleteModal,
  };
}

export default useListRols;
