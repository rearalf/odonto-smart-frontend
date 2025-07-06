import type { FormikHelpers, FormikProps } from 'formik';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

import useGetAllPermission from '@features/permission/query/useGetAllPermissionQuery';
import useNotificationStore from '@stores/useNotificationStore';

import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { IFormValues } from '../types';
import useCreateRoleQuery from '@features/role/mutation/useCreateRole';

function useCreateRole() {
  const theme = useTheme();
  const storeNotification = useNotificationStore();

  const {
    data: dataPermissions,
    isError: isErrorPermissions,
    isLoading: isLoadingPermissions,
  } = useGetAllPermission();

  const { mutate } = useCreateRoleQuery();

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

  const handleCancelForm = (fromState: FormikProps<IFormValues>) => {
    fromState.resetForm();
  };

  const handleSelectAllPermissions = (
    formikProps: FormikProps<IFormValues>,
  ) => {
    const allPermissions = dataPermissions?.data || [];
    const selectedPermissions = formikProps.values.permission_id || [];

    // Estados del checkbox
    const isAllSelected =
      allPermissions.length > 0 &&
      selectedPermissions.length === allPermissions.length;
    const isIndeterminate =
      selectedPermissions.length > 0 &&
      selectedPermissions.length < allPermissions.length;

    // Función para manejar el cambio del checkbox
    const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        // Seleccionar todos los permisos
        const allPermissionIds = allPermissions.map(
          (permission) => permission.id,
        );
        formikProps.setFieldValue('permission_id', allPermissionIds);
      } else {
        // Deseleccionar todos los permisos
        formikProps.setFieldValue('permission_id', []);
      }
      // formikProps.setFieldTouched('permission_id', true);
    };

    return {
      isAllSelected,
      isIndeterminate,
      handleToggleAll,
      totalPermissions: allPermissions.length,
      selectedCount: selectedPermissions.length,
      isDisabled: formikProps.isSubmitting || allPermissions.length === 0,
    };
  };

  const handleSubmit = (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>,
    onClose: (refresh?: boolean) => void,
  ) => {
    formikHelpers.setSubmitting(true);
    mutate(values, {
      onSuccess: () => {
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
        storeNotification.handleShowNotification({
          text: 'Rol creado exitosamente.',
          show: true,
          severity: 'success',
        });
        onClose(true);
      },
      onError: (error) => {
        formikHelpers.setSubmitting(false);
        storeNotification.handleShowNotification({
          text:
            Array.isArray(error.message) && error.message.length > 0
              ? error.message[0]
              : error.message
                ? error.message
                : 'Error al crear el doctor.',
          show: true,
          severity: 'error',
        });
      },
    });
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
    handleCancelForm,
    handleSelectedPermissions,
    handleSelectAllPermissions,
    convertToAutocompleteOptions,
  };
}

export default useCreateRole;
