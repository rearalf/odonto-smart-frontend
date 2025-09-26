import { AffectationForm, Odontogram } from '../components';
import useOdontogramForm from '../hook/useOdontogramForm';

const OdontogramWithForm = () => {
  const { odontogramData, handleToothClick } = useOdontogramForm();
  return (
    <>
      <AffectationForm />

      <Odontogram
        odontogramData={odontogramData}
        handleToothClick={handleToothClick}
      />
    </>
  );
};

export default OdontogramWithForm;
