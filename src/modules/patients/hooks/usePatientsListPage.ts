import { type ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';

function usePatientsListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

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

  return {
    page,
    search,
    rowsPerPage,
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
