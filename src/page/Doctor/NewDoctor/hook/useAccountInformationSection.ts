import { useEffect, useState } from 'react';

import useGetAllPermission from '@features/permission/query/useGetAllPermissionQuery';
import useGetAllRoleQuery from '@features/role/query/useGetAllRoleQuery';
import useNotificationStore from '@stores/useNotificationStore';

import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';

function useAccountInformationSection() {
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

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const storeNotification = useNotificationStore();

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);
  const handleShowConfirmPassword = () =>
    setIsShowConfirmPassword(!isShowConfirmPassword);

  const convertToAutocompleteOptions = (
    items: IBasicIdNameDescription[],
    permissions?: boolean,
  ): IAutocompleteOption[] => {
    if (permissions) {
      return items.map((item) => ({
        id: item.id,
        label: item.label || item.name,
        name: item.label || item.name,
        description: item.description,
      }));
    }
    return items.map((item) => ({
      id: item.id,
      label: item.name,
      name: item.name,
      description: item.description,
    }));
  };

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
    isLoadingRole,
    isShowPassword,
    isLoadingPermission,
    isShowConfirmPassword,
    roles: dataRole?.data || [],
    permissions: dataPermission?.data || [],
    handleShowPassword,
    handleShowConfirmPassword,
    convertToAutocompleteOptions,
  };
}

export default useAccountInformationSection;
