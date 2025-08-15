import { useEffect, useState } from 'react';

import useGetAllPermission from '@modules/permissions/hooks/useGetAllPermissionQuery';

import useNotificationStore from 'src/modules/shared/stores/useNotificationStore';

import { useGetAllRoleQuery } from '@modules/role/hooks/useRolQueries';
import type { IAutocompleteOption } from '@components/AutocompleteComponent/type';
import type { IBasicIdNameDescription } from 'src/modules/shared/types/common.types';
import type { IComponentFormProps } from '../types/newDoctor.types';

function useAccountInformationSection({ formikProps }: IComponentFormProps) {
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

  const selectedPermissions =
    dataPermission && dataPermission.data
      ? dataPermission.data.filter((permission: IBasicIdNameDescription) =>
          formikProps.values.person.user.permission_ids?.includes(
            permission.id,
          ),
        )
      : [];

  const selectedRoles =
    dataRole && dataRole.data
      ? dataRole.data.filter((role: IBasicIdNameDescription) =>
          formikProps.values.person.user.role_ids?.includes(role.id),
        )
      : [];

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
    selectedRoles,
    selectedPermissions,
    handleShowPassword,
    handleShowConfirmPassword,
    convertToAutocompleteOptions,
  };
}

export default useAccountInformationSection;
