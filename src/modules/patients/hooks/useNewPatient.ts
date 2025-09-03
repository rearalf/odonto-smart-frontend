import type { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';

import useNotificationStore from '@stores/useNotificationStore';
import useLoadingStore from '@stores/useLoadingStore';

import type { INewPatientFormValues } from '../types/types';
import { useCreatePatient } from './usePatientQueries';

function useNewPatient() {
  const navigate = useNavigate();
  const storeNotification = useNotificationStore();
  const { toggleLoading } = useLoadingStore();
  const { mutate, isPending } = useCreatePatient();

  const handleCreatePatient = async (
    values: INewPatientFormValues,
    formikHelpers: FormikHelpers<INewPatientFormValues>,
  ) => {
    toggleLoading();
    formikHelpers.setSubmitting(true);
    const formData = new FormData();

    /* 
    Person information
    */
    formData.append('first_name', values.first_name.trim());
    if (values.middle_name && values.middle_name.trim().length > 0)
      formData.append('middle_name', values.middle_name.trim());

    formData.append('last_name', values.last_name.trim());
    formData.append('person_type_id', '5');

    if (
      values.profile_picture_name &&
      values.profile_picture_name.trim().length > 0
    )
      formData.append(
        'profile_picture_name',
        values.profile_picture_name.trim(),
      );

    if (values.profile_picture && values.profile_picture.trim().length > 0)
      formData.append('profile_picture', values.profile_picture.trim());

    if (values.personContact.length > 0)
      formData.append('person_contacts', JSON.stringify(values.personContact));

    /* 
    Patient
    */
    if (values.birth_date)
      formData.append('birth_date', values.birth_date.toISOString());
    if (values.phone !== undefined) formData.append('phone', values.phone);
    if (values.address !== undefined)
      formData.append('address', values.address);
    if (values.occupation !== undefined && values.occupation.trim().length > 0)
      formData.append('occupation', values.occupation);
    if (values.medical_history)
      formData.append('medical_history', values.medical_history);
    if (values.allergic_reactions)
      formData.append('allergic_reactions', values.allergic_reactions);
    if (values.current_systemic_treatment)
      formData.append(
        'current_systemic_treatment',
        values.current_systemic_treatment,
      );
    if (values.lab_results) formData.append('lab_results', values.lab_results);
    formData.append(
      'complete_odontogram',
      `${values.complete_odontogram ? true : false}`,
    );
    if (values.gender) formData.append('gender', values.gender);
    formData.append('snc', `${values.snc ? true : false}`);
    formData.append('svc', `${values.svc ? true : false}`);
    formData.append('se', `${values.se ? true : false}`);
    formData.append('sme', `${values.sme ? true : false}`);
    if (values.systemNotes1)
      formData.append('systemNotes1', values.systemNotes1);
    formData.append('sr', `${values.sr ? true : false}`);
    formData.append('su', `${values.su ? true : false}`);
    formData.append('sgu', `${values.sgu ? true : false}`);
    formData.append('sgi', `${values.sgi ? true : false}`);
    if (values.systemNotes2)
      formData.append('systemNotes2', values.systemNotes2);

    mutate(formData, {
      onSuccess: () => {
        formikHelpers.resetForm();
        navigate('/patient');
        storeNotification.handleShowNotification({
          text: 'Paciente creado exitosamente.',
          show: true,
          severity: 'success',
        });
      },
      onError: (error) => {
        storeNotification.handleShowNotification({
          text:
            Array.isArray(error.message) && error.message.length > 0
              ? error.message[0]
              : error.message
                ? error.message
                : 'Error al crear el paciente.',
          show: true,
          severity: 'error',
        });
      },
      onSettled: () => {
        toggleLoading();
        formikHelpers.setSubmitting(false);
      },
    });
  };

  return {
    isPending,
    handleCreatePatient,
  };
}

export default useNewPatient;
