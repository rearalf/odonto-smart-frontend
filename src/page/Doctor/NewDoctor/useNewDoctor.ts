import { useEffect, useState } from 'react';

// import type { ChangeEvent, ChangeEventHandler, MouseEvent } from 'react';
// import type { MuiTelInputInfo } from 'mui-tel-input';

import useGetSpecialtiesQuery from '@features/doctor/query/useSpecialtyQuery';
import useNotificationStore from '@stores/useNotificationStore';

function useNewDoctor() {
  const {
    isError,
    data: dataSpecialties,
    isLoading: isLoadingSpecialty,
  } = useGetSpecialtiesQuery();

  const storeNotification = useNotificationStore();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);
  const [newContactType, setNewContactType] = useState('EMAIL');
  const [newContactValue, setNewContactValue] = useState('');

  const [specialtiesBySelect, setSpecialtiesBySelect] = useState<
    (number | string)[]
  >([]);

  const isStepOptional = (step: number) => step === 1;

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);
  const handleShowConfirmPassword = () =>
    setIsShowConfirmPassword(!isShowConfirmPassword);

  const handleSetSpecialtiesBySelect = (newSet: (number | string)[]) =>
    setSpecialtiesBySelect(newSet);

  useEffect(() => {
    if (isError) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error en el servidor',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return {
    dataSpecialties,
    isStepOptional,
    isShowPassword,
    isLoadingSpecialty,
    specialtiesBySelect,
    isShowConfirmPassword,
    handleShowPassword,
    handleShowConfirmPassword,
    handleSetSpecialtiesBySelect,
    newContactType,
    setNewContactType,
    newContactValue,
    setNewContactValue,
  };
}

export default useNewDoctor;
