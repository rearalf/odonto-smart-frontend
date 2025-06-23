import { useEffect, useState } from 'react';

import useGetAllPermission from '@features/permission/query/useGetAllPermissionQuery';
import useGetSpecialtiesQuery from '@features/doctor/query/useSpecialtyQuery';
import useGetAllRoleQuery from '@features/role/query/useGetAllRoleQuery';
import useNotificationStore from '@stores/useNotificationStore';

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

  const {
    data: dataPermission,
    isError: isErrorPermission,
    isLoading: isLoadingPermission,
  } = useGetAllPermission();

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
        text: 'Error al obtener las especialidades',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorSpecialty]);

  useEffect(() => {
    if (isErrorRole) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al obtener los roles',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorRole]);

  useEffect(() => {
    if (isErrorPermission) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al obtener los permisos',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorPermission]);

  return {
    dataRole,
    isLoadingRole,
    dataPermission,
    isShowPassword,
    dataSpecialties,
    isLoadingSpecialty,
    isLoadingPermission,
    isShowConfirmPassword,
    handleShowPassword,
    handleShowConfirmPassword,
  };
}

export default useNewDoctor;
