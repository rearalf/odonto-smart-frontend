import { useEffect, useState } from 'react';

function useListDoctor() {
  const [doctor, setDoctor] = useState<IListDoctor[]>([]);
  const [page, setPage] = useState<number>(0);
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

  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };

  const handleSetRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  useEffect(() => {
    doctor.push();
    setDoctor([
      {
        fullName: 'Nombre 1',
        id: 1,
        email: 'reasdfas',
        specialty: 'Odonto',
        role: [{ id: 1, name: 'Rol' }],
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    page,
    doctor,
    rowsPerPage,
    breadCrumbs,
    handleSetPage,
    handleSetRowsPerPage,
  };
}

export default useListDoctor;
