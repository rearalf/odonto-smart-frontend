import useGetAllDoctorsQuery from '@features/doctor/query/useGetAllDoctors';
import useNotificationStore from '@stores/useNotificationStore';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function useListDoctor() {
  const navigate = useNavigate();
  const storeNotification = useNotificationStore();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [idDoctor, setIdDoctor] = useState<null | number>(null);
  const [search, setSearch] = useState<string>('');

  const { data, isLoading, isError } = useGetAllDoctorsQuery({
    pagination: true,
    page: page,
    per_page: rowsPerPage,
    search,
  });

  const handleShowDeleteModal = (id?: number) => {
    if (id) setIdDoctor(id);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleSetPage = (newPage: number) => setPage(newPage);

  const handleSetRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleNewDoctor = () => navigate('/doctor/new-doctor');

  const handleDeleteDoctor = () => {
    if (idDoctor) {
      setIdDoctor(null);
    }
    handleShowDeleteModal();
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleClearFilter = () => {
    setSearch('');
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
    doctors: data && data.data ? data.data : [],
    pagination: data && data.pagination ? data.pagination : null,
    isLoading,
    rowsPerPage,
    openDeleteModal,
    handleSetPage,
    handleNewDoctor,
    handleSearchInput,
    handleClearFilter,
    handleDeleteDoctor,
    handleSetRowsPerPage,
    handleShowDeleteModal,
  };
}

export default useListDoctor;
