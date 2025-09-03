import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetAllPatientsQuery } from './usePatientQueries';
import { useDebounce } from '@uidotdev/usehooks';
import useNotificationStore from '@stores/useNotificationStore';
import useLoadingStore from '@stores/useLoadingStore';

function usePatientsListPage() {
  const navigate = useNavigate();
  const storeNotification = useNotificationStore();
  const { setLoading } = useLoadingStore();

  const [search, setSearch] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const debouncedSearch = useDebounce(search, 1000);

  const {
    data,
    isError,
    isLoading: isLoadingPatients,
  } = useGetAllPatientsQuery({
    pagination: true,
    page,
    per_page: rowsPerPage,
    search: debouncedSearch,
  });

  const handleNewPatient = () => navigate('/patient/new-patient');

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSearch = () => {};
  const handleClearFilter = () => {};

  const handleSetPage = (newPage: number) => setPage(newPage);
  const handleSetRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleShowDeleteModal = (_id?: number) => {};

  const handleShowModalDoctorDetail = (_id: number | null) => {};

  useEffect(() => {
    if (isError) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al cargar los datos',
      });
    }
  }, [isError, storeNotification]);

  useEffect(() => {
    setLoading(isLoadingPatients);
  }, [isLoadingPatients, setLoading]);

  return {
    page,
    search,
    rowsPerPage,
    isLoading: isLoadingPatients,
    patientsData: data && data.data ? data.data : [],
    pagination: data && data.pagination ? data.pagination : null,
    handleSearch,
    handleSetPage,
    handleNewPatient,
    handleSearchInput,
    handleClearFilter,
    handleSetRowsPerPage,
    handleShowDeleteModal,
    handleShowModalDoctorDetail,
  };
}

export default usePatientsListPage;
