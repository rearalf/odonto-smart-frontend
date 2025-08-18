import { useNavigate } from 'react-router';

function usePatientsListPage() {
  const navigate = useNavigate();

  const handleNewPatient = () => navigate('/patient/new-patient');

  return {
    handleNewPatient,
  };
}

export default usePatientsListPage;
