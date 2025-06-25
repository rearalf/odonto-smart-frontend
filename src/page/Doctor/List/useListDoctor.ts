import { useState } from 'react';

import type { IListDoctor } from 'src/types/doctor';

function useListDoctor() {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [doctor, _setDoctor] = useState<IListDoctor[]>([]);
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
