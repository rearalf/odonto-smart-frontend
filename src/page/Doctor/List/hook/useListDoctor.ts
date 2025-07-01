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
  const [specialtyId, setSpecialtyId] = useState<number | null>(null);

  const { data, isLoading, isError, refetch } = useGetAllDoctorsQuery({
    pagination: true,
    page: page,
    per_page: rowsPerPage,
    search,
    specialtyId: specialtyId || undefined,
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
    setSpecialtyId(null);
  };

  const handleSetSpecialty = (id: number | null) => setSpecialtyId(id);

  const handleSearch = () => {
    if (search.trim().length > 0 || specialtyId !== null) {
      refetch();
    }
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
    specialtyId,
    openDeleteModal,
    handleSearch,
    handleSetPage,
    handleNewDoctor,
    handleSearchInput,
    handleClearFilter,
    handleDeleteDoctor,
    handleSetSpecialty,
    handleSetRowsPerPage,
    handleShowDeleteModal,
  };
}

export default useListDoctor;
