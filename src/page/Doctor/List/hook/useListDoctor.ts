import { type ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router';

import useGetAllDoctorsQuery from '@features/doctor/query/useGetAllDoctors';
import useNotificationStore from '@stores/useNotificationStore';
import useGetOneDoctor from '@features/doctor/query/useGetOneDoctor';
import useLoadingStore from '@stores/useLoadingStore';

function useListDoctor() {
  const navigate = useNavigate();
  const storeNotification = useNotificationStore();
  const { handleLoading } = useLoadingStore();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [showModalDoctorDetail, setShowModalDoctorDetail] =
    useState<boolean>(false);

  const [idDoctor, setIdDoctor] = useState<null | number>(null);
  const [doctorDetailId, setDoctorDetailId] = useState<number | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [search, setSearch] = useState<string>('');
  const [specialtyId, setSpecialtyId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(search, 1000);
  const debouncedSpecialtyId = useDebounce(specialtyId, 1000);

  const { data, isLoading, isError, refetch } = useGetAllDoctorsQuery({
    pagination: true,
    page: page,
    per_page: rowsPerPage,
    search: debouncedSearch,
    specialtyId: debouncedSpecialtyId || undefined,
  });

  const {
    data: dataDoctorDetail,
    isLoading: isLoadingDoctorDetail,
    isError: isErrorDoctorDetail,
  } = useGetOneDoctor(doctorDetailId);

  const handleShowDeleteModal = (id?: number) => {
    if (id) setIdDoctor(id);
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleShowModalDoctorDetail = (id: number | null) => {
    setDoctorDetailId(id);
    setShowModalDoctorDetail(!showModalDoctorDetail);
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

  useEffect(() => {
    if (isErrorDoctorDetail) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al cargar los detalles de un doctor',
      });
    }
  }, [isErrorDoctorDetail, storeNotification]);

  useEffect(() => {
    handleLoading(isLoadingDoctorDetail);
  }, [isLoadingDoctorDetail, handleLoading]);

  return {
    page,
    search,
    doctors: data && data.data ? data.data : [],
    pagination: data && data.pagination ? data.pagination : null,
    openModal: showModalDoctorDetail,
    isLoading,
    rowsPerPage,
    specialtyId,
    openDeleteModal,
    dataDoctorDetail:
      dataDoctorDetail && dataDoctorDetail.data ? dataDoctorDetail.data : null,
    isLoadingDoctorDetail,
    handleSearch,
    handleSetPage,
    handleNewDoctor,
    handleSearchInput,
    handleClearFilter,
    handleDeleteDoctor,
    handleSetSpecialty,
    handleSetRowsPerPage,
    handleShowDeleteModal,
    handleShowModalDoctorDetail,
  };
}

export default useListDoctor;
