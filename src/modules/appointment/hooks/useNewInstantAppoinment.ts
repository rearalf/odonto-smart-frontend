import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import type { IAppointmentInstant } from '../types/index.types';
import type { FormikHelpers } from 'formik';

import useOdontogramStore from '@stores/useOdontogramStore';
import useLoadingStore from '@stores/useLoadingStore';

import { useGetOdontogramByPatientId } from '@modules/odontogram/hook/useOdontogramQueries';
import { useGetPatientByIdQuery } from '@modules/patients/hooks/usePatientQueries';
import { useGetDoctorList } from '@modules/doctors/hooks/useDoctorsQueries';

import { combineTeethData } from '@modules/odontogram/utils/combineTeethData';
import { CONSTANTTEETHLIST } from '@modules/shared/constans/teeth';
import { MODULES } from '@config/modules';
import type { IToothObject } from '@modules/odontogram/types/type';
import { useCreateInstantAppointment } from './useAppointmentQueries';
import useNotificationStore from '@stores/useNotificationStore';

function useNewInstantAppoinment() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const { setLoading } = useLoadingStore();
  const storeNotification = useNotificationStore();
  const { setOdontogramData, getModifiedTeeth } = useOdontogramStore();

  const { data: doctorData, isLoading: doctorIsLoading } = useGetDoctorList();
  const { data: patientData, isLoading: patientIsLoading } =
    useGetPatientByIdQuery(patientId || '');
  const {
    data: odontogramData,
    isLoading: odontogramIsLoading,
    error: odontogramError,
  } = useGetOdontogramByPatientId(Number(patientId));
  const { mutate: createAppointment } = useCreateInstantAppointment();

  const [patientDialog, setPatientDialog] = useState<boolean>(false);

  const handleOpenPatientDialog = () => {
    setPatientDialog(!patientDialog);
  };

  const handleSave = async (
    values: IAppointmentInstant,
    formikHelpers: FormikHelpers<IAppointmentInstant>,
  ) => {
    formikHelpers.setSubmitting(true);
    const teeth: IToothObject[] = [];
    if (MODULES.ODONTOGRAM) {
      const modifiedTeeth = getModifiedTeeth();
      if (modifiedTeeth.length > 0) {
        modifiedTeeth.map((tooth) => teeth.push(tooth));
      }

      const requestData: IAppointmentInstant = {
        patient_id: patientId ? Number(patientId) : 0,
        appointment_date: values.appointment_date,
        end_time: values.end_time,
        start_time: values.start_time,
        reason: values.reason,
      };

      if (MODULES.DOCTORS) requestData.doctor_id = values.doctor_id;
      if (MODULES.ODONTOGRAM) requestData.teeth = teeth;
      if (values.notes) requestData.notes = values.notes;

      createAppointment(requestData, {
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
        onSuccess: () => {
          formikHelpers.resetForm();
          formikHelpers.setSubmitting(false);
          storeNotification.handleShowNotification({
            text: 'Doctor creado exitosamente.',
            show: true,
            severity: 'success',
          });
          navigate('/appointment');
        },
      });

      formikHelpers.setSubmitting(false);
    }
  };

  useEffect(() => {
    setLoading(patientIsLoading);
  }, [patientIsLoading, setLoading]);

  useEffect(() => {
    setLoading(doctorIsLoading);
  }, [doctorIsLoading, setLoading]);

  useEffect(() => {
    if (MODULES.ODONTOGRAM) setLoading(odontogramIsLoading);
  }, [odontogramIsLoading, setLoading]);

  useEffect(() => {
    if (MODULES.ODONTOGRAM) {
      const updatedData = combineTeethData(
        CONSTANTTEETHLIST,
        odontogramData && odontogramData.data ? odontogramData.data.tooth : [],
      );
      setOdontogramData(updatedData);
    }
  }, [odontogramData, setOdontogramData]);

  return {
    patientId,
    patientDialog,
    doctorIsLoading,
    odontogramError,
    patientIsLoading,
    odontogramIsLoading,
    odontogramData: odontogramData || [],
    patientData: patientData && patientData.data ? patientData.data : null,
    doctorsList: doctorData && doctorData.data ? doctorData.data : [],
    handleSave,
    handleOpenPatientDialog,
  };
}

export default useNewInstantAppoinment;
