import useGetAllDoctorsQuery from '@features/doctor/query/useGetAllDoctors';
import useNotificationStore from '@stores/useNotificationStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function useListDoctor() {
  const navigate = useNavigate();
  const storeNotification = useNotificationStore();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { data, isLoading, isError } = useGetAllDoctorsQuery({
    pagination: true,
    page: page,
    per_page: rowsPerPage,
  });

  const breadCrumbs = [
    {
      link_name: 'Dashboard',
      link_to: '/',
    },
    {
      link_name: 'Doctores',
      link_to: '/doctor',
    },
  ];

  const handleShowDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };

  const handleSetRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleNewDoctor = () => navigate('/doctor/new-doctor');

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
    doctors: data && data.data ? data.data : [],
    pagination: data && data.pagination ? data.pagination : null,
    isLoading,
    rowsPerPage,
    openDeleteModal,
    breadCrumbs,
    handleSetPage,
    handleNewDoctor,
    handleSetRowsPerPage,
    handleShowDeleteModal,
  };
}

export default useListDoctor;
