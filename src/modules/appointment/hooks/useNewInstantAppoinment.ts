import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import {
  ARRAY_FACE_AFFECTIONS,
  CONSTANTTEETHLIST,
} from '@modules/shared/constans/teeth';
import {
  TOOTH_STATE,
  TOOTH_FACE_AFFECTION,
  type FACE_TYPE,
  type ITeethList,
  type IToothObject,
  type TOOTH_STATE_TYPE,
  type TOOTH_FACE_AFFECTION_TYPE,
} from '../types/teeth.type';
import useAffectationState from '@stores/useAffectationState';
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

  const [odontogramData, setOdontogramData] = useState(CONSTANTTEETHLIST);

  const { data } = useGetDoctorList();

  const selectedAffection: TOOTH_STATE_TYPE | TOOTH_FACE_AFFECTION_TYPE | null =
    useAffectationState((state) => state.affectation);

  function combineTeethData(
    baseTeeth: ITeethList,
    modifiedTeeth: IToothObject[],
  ) {
    const updatedTeeth: ITeethList = JSON.parse(JSON.stringify(baseTeeth));

    modifiedTeeth.forEach((modifiedTooth) => {
      Object.keys(updatedTeeth.permanent).forEach((quadrantKey) => {
        const quadrant =
          updatedTeeth.permanent[
            quadrantKey as keyof typeof updatedTeeth.permanent
          ];
        quadrant.forEach((tooth, index) => {
          if (tooth.tooth_number === modifiedTooth.tooth_number) {
            quadrant[index] = { ...tooth, ...modifiedTooth };
          }
        });
      });

      Object.keys(updatedTeeth.temporary).forEach((quadrantKey) => {
        const quadrant =
          updatedTeeth.temporary[
            quadrantKey as keyof typeof updatedTeeth.temporary
          ];
        quadrant.forEach((tooth, index) => {
          if (tooth.tooth_number === modifiedTooth.tooth_number) {
            quadrant[index] = { ...tooth, ...modifiedTooth };
          }
        });
      });
    });

    return updatedTeeth;
  }

  const handleToothStateChange = (
    quadrants: Record<string, IToothObject[]>,
    key: string,
    index: number,
    face?: FACE_TYPE,
  ) => {
    if (
      face &&
      ARRAY_FACE_AFFECTIONS.includes(
        (selectedAffection as TOOTH_FACE_AFFECTION_TYPE) || TOOTH_STATE,
      )
    ) {
      quadrants[key][index][face] = selectedAffection as TOOTH_FACE_AFFECTION;
    } else {
      if (
        !ARRAY_FACE_AFFECTIONS.includes(
          selectedAffection as TOOTH_FACE_AFFECTION_TYPE,
        )
      ) {
        quadrants[key][index].general_state = selectedAffection as TOOTH_STATE;
      } else if (selectedAffection === 'healthy') {
        quadrants[key][index].general_state = TOOTH_STATE.HEALTHY;
      }
    }
  };

  const handleToothClick = useCallback(
    (tooth: IToothObject, face?: FACE_TYPE) => {
      setOdontogramData((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData));

        const updateQuadrants = (quadrants: Record<string, IToothObject[]>) => {
          Object.keys(quadrants).forEach((key) => {
            quadrants[key].forEach((t, index) => {
              if (t.tooth_number === tooth.tooth_number) {
                handleToothStateChange(quadrants, key, index, face);
              }
            });
          });
        };

        updateQuadrants(newData.permanent);
        updateQuadrants(newData.temporary);

        return newData;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAffection],
  );

  const getModifiedTeeth = (): IToothObject[] => {
    const modifiedTeeth: IToothObject[] = [];

    const compareQuadrants = (
      original: Record<string, IToothObject[]>,
      updated: Record<string, IToothObject[]>,
    ) => {
      Object.keys(original).forEach((key) => {
        original[key].forEach((origTooth, index) => {
          const updatedTooth = updated[key][index];

          // Compara estado general y todas las caras
          const isDifferent =
            origTooth.general_state !== updatedTooth.general_state ||
            origTooth.palatina !== updatedTooth.palatina ||
            origTooth.distal !== updatedTooth.distal ||
            origTooth.mesial !== updatedTooth.mesial ||
            origTooth.vestibular !== updatedTooth.vestibular ||
            origTooth.oclusal !== updatedTooth.oclusal;

          if (isDifferent) {
            modifiedTeeth.push(updatedTooth);
          }
        });
      });
    };

    compareQuadrants(CONSTANTTEETHLIST.permanent, odontogramData.permanent);
    compareQuadrants(CONSTANTTEETHLIST.temporary, odontogramData.temporary);

    return modifiedTeeth;
  };

  const handleSave = () => {
    // const modifiedTeeth = getModifiedTeeth();
  };

  useEffect(() => {
    const updatedData = combineTeethData(
      CONSTANTTEETHLIST,
      backendModifiedTeeth,
    );

    setOdontogramData(updatedData);
  }, []);

  return {
    patientId,
    doctorsList: data && data.data ? data.data : [],
    odontogramData,
    handleSave,
    getModifiedTeeth,
    handleToothClick,
  };
}

export default useNewInstantAppoinment;
