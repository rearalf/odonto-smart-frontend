import { useEffect, useState } from 'react';

// import type { ChangeEvent, ChangeEventHandler, MouseEvent } from 'react';
// import type { MuiTelInputInfo } from 'mui-tel-input';

import useGetSpecialtiesQuery from '@features/doctor/query/useSpecialtyQuery';
import useNotificationStore from '@stores/useNotificationStore';
import useGetAllRoleQuery from '@features/role/query/useGetAllRoleQuery';

function useNewDoctor() {
  const {
    data: dataSpecialties,
    isError: isErrorSpecialty,
    isLoading: isLoadingSpecialty,
  } = useGetSpecialtiesQuery();

  const {
    data: dataRole,
    isError: isErrorRole,
    isLoading: isLoadingRole,
  } = useGetAllRoleQuery();

  const storeNotification = useNotificationStore();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);
  const handleShowConfirmPassword = () =>
    setIsShowConfirmPassword(!isShowConfirmPassword);

  useEffect(() => {
    if (isErrorSpecialty) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error en el servidor',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorSpecialty]);

  useEffect(() => {
    if (isErrorRole) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error en el servidor',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorRole]);

  return {
    dataRole,
    isLoadingRole,
    isShowPassword,
    dataSpecialties,
    isLoadingSpecialty,
    isShowConfirmPassword,
    handleShowPassword,
    handleShowConfirmPassword,
  };
}

export default useNewDoctor;
