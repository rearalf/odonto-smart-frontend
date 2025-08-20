import { useNavigate } from 'react-router';
import type { FormikHelpers } from 'formik';

import useNotificationStore from '@modules/shared/stores/useNotificationStore';
import { useCreateDoctor } from './useDoctorsQueries';

import type { IFormValues } from '../types/newDoctor.types';

function useNewDoctor() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateDoctor();

  const storeNotification = useNotificationStore();

  const handleSubmit = (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>,
  ) => {
    formikHelpers.setSubmitting(true);
    const formData = new FormData();

    formData.append('email', values.person.user.email.trim());
    formData.append('password', values.person.user.password.trim());
    formData.append('role_ids', values.person.user.role_ids.toString());
    if (values.person.user.permission_ids.length > 0)
      formData.append(
        'permission_ids',
        values.person.user.permission_ids.toString(),
      );

    formData.append('first_name', values.person.first_name.trim());
    if (
      values.person.middle_name &&
      values.person.middle_name.trim().length > 0
    )
      formData.append('middle_name', values.person.middle_name.trim());
    formData.append('last_name', values.person.last_name.trim());
    formData.append('person_type_id', '4');

    if (
      values.person.profile_picture_name &&
      values.person.profile_picture_name.trim().length > 0
    )
      formData.append(
        'profile_picture_name',
        values.person.profile_picture_name.trim(),
      );

    if (
      values.person.profile_picture &&
      values.person.profile_picture.trim().length > 0
    )
      formData.append('profile_picture', values.person.profile_picture.trim());

    if (values.person.personContact.length > 0)
      formData.append(
        'personContact',
        JSON.stringify(values.person.personContact),
      );

    if (values.qualification.trim().length > 0)
      formData.append('qualification', values.qualification);
    if (values.specialty_id !== null)
      formData.append('specialty_id', values.specialty_id.toString());
    if (values.specialty_ids.length > 0)
      formData.append('specialty_ids', JSON.stringify(values.specialty_ids));

    mutate(formData, {
      onSuccess: (_value) => {
        formikHelpers.resetForm();
        formikHelpers.setSubmitting(false);
        storeNotification.handleShowNotification({
          text: 'Doctor creado exitosamente.',
          show: true,
          severity: 'success',
        });
        navigate('/doctor');
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

  return {
    isPending,
    handleSubmit,
  };
}

export default useNewDoctor;
