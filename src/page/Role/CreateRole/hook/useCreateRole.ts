import type { FormikHelpers, FormikProps } from 'formik';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

import useGetAllPermission from '@features/permission/query/useGetAllPermissionQuery';
import useNotificationStore from '@stores/useNotificationStore';

import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { IFormValues } from '../types';

function useCreateRole() {
  const theme = useTheme();
  const storeNotification = useNotificationStore();

  const {
    data: dataPermissions,
    isError: isErrorPermissions,
    isLoading: isLoadingPermissions,
  } = useGetAllPermission();

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

  const handleSelectedPermissions = (formikProps: FormikProps<IFormValues>) =>
    dataPermissions && dataPermissions.data
      ? dataPermissions.data.filter((permission: IBasicIdNameDescription) =>
          formikProps.values.permission_id?.includes(permission.id),
        )
      : [];

  const handleSubmit = (
    values: IFormValues,
    _formikHelpers: FormikHelpers<IFormValues>,
  ) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  useEffect(() => {
    if (isErrorPermissions) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al obtener los permisos',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorPermissions]);

  return {
    theme,
    isLoadingPermissions,
    permissions: dataPermissions?.data || [],
    handleSubmit,
    handleSelectedPermissions,
    convertToAutocompleteOptions,
  };
}

export default useCreateRole;
