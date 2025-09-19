import { useParams } from 'react-router';

import {
  TOOTH_STATE,
  TOOTH_FACE_AFFECTION,
  type IToothObject,
} from '../../odontogram/types/type';
import { useGetDoctorList } from '@modules/doctors/hooks/useDoctorsQueries';

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

  const { data } = useGetDoctorList();

  const handleSave = () => {
    // const modifiedTeeth = getModifiedTeeth();
  };

  return {
    patientId,
    backendModifiedTeeth,
    doctorsList: data && data.data ? data.data : [],
    handleSave,
  };
}

export default useNewInstantAppoinment;
