import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { IAppointmentInstant } from '../types/index.types';
import type { FormikHelpers } from 'formik';

import { useGetOdontogramByPatientId } from '@modules/odontogram/hook/useOdontogramQueries';
import { useGetPatientByIdQuery } from '@modules/patients/hooks/usePatientQueries';
import { useGetDoctorList } from '@modules/doctors/hooks/useDoctorsQueries';
// import useOdontogramStore from '@stores/useOdontogramStore';

import {
  TOOTH_STATE,
  type IToothObject,
  TOOTH_FACE_AFFECTION,
} from '../../odontogram/types/type';
import useLoadingStore from '@stores/useLoadingStore';

const backendModifiedTeeth: IToothObject[] = [
  {
    id: 16,
    tooth_number: 16,
    general_state: TOOTH_STATE.HEALTHY,
    palatina: TOOTH_FACE_AFFECTION.DECAY,
    distal: TOOTH_FACE_AFFECTION.HEALTHY,
    mesial: TOOTH_FACE_AFFECTION.HEALTHY,
    vestibular: TOOTH_FACE_AFFECTION.HEALTHY,
    oclusal: TOOTH_FACE_AFFECTION.HEALTHY,
  },
  {
    id: 26,
    tooth_number: 26,
    general_state: TOOTH_STATE.EXTRACTION_DONE,
    palatina: TOOTH_FACE_AFFECTION.HEALTHY,
    distal: TOOTH_FACE_AFFECTION.HEALTHY,
    mesial: TOOTH_FACE_AFFECTION.HEALTHY,
    vestibular: TOOTH_FACE_AFFECTION.HEALTHY,
    oclusal: TOOTH_FACE_AFFECTION.HEALTHY,
  },
];

function useNewInstantAppoinment() {
  const { patientId } = useParams();

  const { setLoading } = useLoadingStore();
  // const getModifiedTeeth = useOdontogramStore(
  //   (state) => state.getModifiedTeeth,
  // );

  const { data: doctorData, isLoading: doctorIsLoading } = useGetDoctorList();
  const { data: patientData, isLoading: patientIsLoading } =
    useGetPatientByIdQuery(patientId || '');
  const {
    data: odontogramData,
    isLoading: odontogramIsLoading,
    error: odontogramError,
  } = useGetOdontogramByPatientId(Number(patientId));

  const [patientDialog, setPatientDialog] = useState<boolean>(false);

  const handleOpenPatientDialog = () => {
    setPatientDialog(!patientDialog);
  };

  const handleSave = (
    _values: IAppointmentInstant,
    _formikHelpers: FormikHelpers<IAppointmentInstant>,
  ) => {
    // const modifiedTeeth = getModifiedTeeth();
  };

  useEffect(() => {
    setLoading(patientIsLoading);
  }, [patientIsLoading, setLoading]);

  useEffect(() => {
    setLoading(doctorIsLoading);
  }, [doctorIsLoading, setLoading]);

  return {
    patientId,
    patientDialog,
    doctorIsLoading,
    odontogramError,
    patientIsLoading,
    odontogramIsLoading,
    backendModifiedTeeth,
    odontogramData: odontogramData || [],
    patientData: patientData && patientData.data ? patientData.data : null,
    doctorsList: doctorData && doctorData.data ? doctorData.data : [],
    handleSave,
    handleOpenPatientDialog,
  };
}

export default useNewInstantAppoinment;
