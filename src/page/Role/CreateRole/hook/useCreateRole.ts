import type { FormikHelpers, FormikProps } from 'formik';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

import useGetAllPermissionGrouped from '@features/permission/query/useGetAllPermissionGrouped';
import useCreateRoleQuery from '@features/role/mutation/useCreateRole';
import useNotificationStore from '@stores/useNotificationStore';

import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { IFormValues } from '../types';

function useCreateRole() {
  const theme = useTheme();
  const navigate = useNavigate();

  const storeNotification = useNotificationStore();

  const {
    data: dataPermissions,
    isError: isErrorPermissions,
    isLoading: isLoadingPermissions,
  } = useGetAllPermissionGrouped();

  const { mutate } = useCreateRoleQuery();

  const handleTogglePermission = (
    formikProps: FormikProps<IFormValues>,
    permission: IBasicIdNameDescription,
  ) => {
    const current = formikProps.values.permission_id || [];
    const isSelected = current.includes(permission.id);
    const updated = isSelected
      ? current.filter((id) => id !== permission.id)
      : [...current, permission.id];
    formikProps.setFieldValue('permission_id', updated);
  };

  const handleToggleGroupPermissions = (
    formikProps: FormikProps<IFormValues>,
    groupPermissions: number[],
    allSelected: boolean,
  ) => {
    const current = formikProps.values.permission_id || [];

    const updated = allSelected
      ? current.filter((id) => !groupPermissions.includes(id))
      : [...new Set([...current, ...groupPermissions])];

    formikProps.setFieldValue('permission_id', updated);
  };

  const handleSubmit = (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>,
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
        navigate('/rol');
      },
      onError: (error) => {
        formikHelpers.setSubmitting(false);
        storeNotification.handleShowNotification({
          text:
            Array.isArray(error.message) && error.message.length > 0
              ? error.message[0]
              : error.message
                ? error.message
                : 'Error al crear el rol.',
          show: true,
          severity: 'error',
        });
      },
    });
  };

  const handleCancelForm = () => {
    navigate('/rol');
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
    handleTogglePermission,
    handleToggleGroupPermissions,
  };
}

export default useCreateRole;
