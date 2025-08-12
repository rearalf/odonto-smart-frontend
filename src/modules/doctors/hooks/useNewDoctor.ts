import { useNavigate } from 'react-router';
import type { FormikHelpers } from 'formik';

import useNotificationStore from '@modules/shared/stores/useNotificationStore';
import { useCreateDoctor } from './useDoctorsQueries';

import type {
  IFormValues,
  INewDoctorPersonFormData,
} from '../types/newDoctor.types';

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

    if (values.qualification.trim().length > 0)
      formData.append('qualification', values.qualification);
    if (values.specialty_ids.length > 0)
      formData.append('specialty_ids', JSON.stringify(values.specialty_ids));

    if (values.specialty_id !== null)
      formData.append('specialty_id', values.specialty_id.toString());

    const person: INewDoctorPersonFormData = {
      first_name: values.person.first_name.trim(),
      last_name: values.person.last_name.trim(),
      person_type_id: 4,
      user: {
        email: values.person.user.email.trim(),
        password: values.person.user.password.trim(),
        role_ids: values.person.user.role_ids,
      },
    };

    if (values.person.user.permission_ids)
      person.user.permission_ids = values.person.user.permission_ids;

    if (
      values.person.middle_name &&
      values.person.middle_name.trim().length > 0
    )
      person.middle_name = values.person.middle_name.trim();

    if (
      values.person.profile_picture_name &&
      values.person.profile_picture_name.trim().length > 0
    )
      person.profile_picture_name = values.person.profile_picture_name.trim();

    if (
      values.person.profile_picture &&
      values.person.profile_picture.trim().length > 0
    )
      person.profile_picture = values.person.profile_picture;

    if (values.person.personContact.length > 0)
      person.personContact = values.person.personContact.map((contact) => ({
        contact_value: contact.contact_value.trim(),
        contact_type: contact.contact_type,
      }));

    formData.append('person', JSON.stringify(person));

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
