import { useEffect, useState } from 'react';

function useListDoctor() {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [doctor, setDoctor] = useState<IListDoctor[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

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

  useEffect(() => {
    setDoctor([
      {
        fullName: 'Nombre 1',
        id: 1,
        email: 'reasdfas',
        specialty: 'Odonto',
        role: [{ id: 1, name: 'Rol' }],
      },
      {
        id: 2,
        fullName: 'Nombre 1',
        email: 'reasdfas',
        specialty: 'Odonto',
        role: [{ id: 1, name: 'Rol' }],
      },
    ]);
  }, []);

  return {
    page,
    doctor,
    rowsPerPage,
    openDeleteModal,
    breadCrumbs,
    handleSetPage,
    handleSetRowsPerPage,
    handleShowDeleteModal,
  };
}

export default useListDoctor;
