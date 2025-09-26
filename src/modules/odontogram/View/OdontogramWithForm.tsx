import { AffectationForm, Odontogram } from '../components';
import useOdontogramForm from '../hook/useOdontogramForm';
import type { IToothObject } from '../types/type';

const OdontogramWithForm = ({
  backendModifiedTeeth,
}: {
  backendModifiedTeeth: IToothObject[];
}) => {
  const { odontogramData, handleToothClick } =
    useOdontogramForm(backendModifiedTeeth);
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
