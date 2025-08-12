import type { FormikHelpers, FormikProps } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import useGetAllPermissionGrouped from '@modules/permissions/hooks/useGetAllPermissionGrouped';
import useCreateRoleQuery from '@features/role/mutation/useCreateRole';
import useNotificationStore from 'src/modules/shared/stores/useNotificationStore';

import useGetOneRoleQuery from '@features/role/query/useGetOneRoleQuery';
import type { IBasicIdNameDescription } from 'src/modules/shared/types/common.types';
import { INITIAL_VALUES } from '../constants';
import type { IFormValues } from '../types';
import useUpdateRole from '@features/role/mutation/useUpdateRole';

function useCreateRole() {
  const { id } = useParams();

  const theme = useTheme();
  const navigate = useNavigate();

  const storeNotification = useNotificationStore();

  const {
    data: dataPermissions,
    isError: isErrorPermissions,
    isLoading: isLoadingPermissions,
  } = useGetAllPermissionGrouped();

  const { data: roleData, isError: isErrorRole } = useGetOneRoleQuery(
    id ? Number(id) : undefined,
  );

  const { mutate: createRole } = useCreateRoleQuery();
  const { mutate: updateRole } = useUpdateRole();

  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

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

    if (id) {
      updateRole(
        { params: values, id: Number(id) },
        {
          onSuccess: () => {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
            storeNotification.handleShowNotification({
              text: 'Rol actualizado exitosamente.',
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
                    : 'Error al actualizar el rol.',
              show: true,
              severity: 'error',
            });
          },
        },
      );
    } else {
      createRole(values, {
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
    }
  };

  const handleCancelForm = () => navigate('/rol');

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

  useEffect(() => {
    if (isErrorRole) {
      storeNotification.handleShowNotification({
        show: true,
        severity: 'error',
        text: 'Error al obtener el rol',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorRole]);

  useEffect(() => {
    if (id && roleData) {
      setInitialValues({
        name: roleData.data.name,
        description: roleData.data.description || '',
        permission_id: roleData.data.permission,
      });
    }
  }, [id, roleData]);

  return {
    id,
    theme,
    roleData,
    initialValues,
    isLoadingPermissions,
    permissions: dataPermissions?.data || [],
    handleSubmit,
    handleCancelForm,
    handleTogglePermission,
    handleToggleGroupPermissions,
  };
}

export default useCreateRole;
