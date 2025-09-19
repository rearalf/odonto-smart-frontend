import { useParams } from 'react-router';

import {
  TOOTH_STATE,
  TOOTH_FACE_AFFECTION,
  type IToothObject,
} from '../../odontogram/types/type';
import { useGetDoctorList } from '@modules/doctors/hooks/useDoctorsQueries';
import { useGetPatientByIdQuery } from '@modules/patients/hooks/usePatientQueries';
import useLoadingStore from '@stores/useLoadingStore';
import { useEffect, useState } from 'react';

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

  const { data: doctorData, isLoading: doctorIsLoading } = useGetDoctorList();
  const { data: patientData, isLoading: patientIsLoading } =
    useGetPatientByIdQuery(patientId || '');

  const [patientDialog, setPatientDialog] = useState<boolean>(false);

  const handleOpenPatientDialog = () => {
    setPatientDialog(!patientDialog);
  };

  const handleSave = () => {
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
    patientIsLoading,
    patientData: patientData && patientData.data ? patientData.data : null,
    backendModifiedTeeth,
    doctorsList: doctorData && doctorData.data ? doctorData.data : [],
    handleSave,
    handleOpenPatientDialog,
  };
}

export default useNewInstantAppoinment;
