import { useCallback, useEffect } from 'react';

import { combineTeethData } from '../utils/combineTeethData';
import {
  CONSTANTTEETHLIST,
  ARRAY_FACE_AFFECTIONS,
} from '@modules/shared/constans/teeth';
import {
  TOOTH_STATE,
  type FACE_TYPE,
  type ITeethList,
  type QuadrantKey,
  type IToothObject,
  type TOOTH_STATE_TYPE,
  type TemporaryQuadrantKey,
  type TOOTH_FACE_AFFECTION,
  type TOOTH_FACE_AFFECTION_TYPE,
} from '../types/type';

import useAffectationState from '@stores/useAffectationState';
import useOdontogramStore from '@stores/useOdontogramStore';

function useOdontogramForm(backendModifiedTeeth: IToothObject[]) {
  const { odontogramData, setOdontogramData } = useOdontogramStore();

  const selectedAffection: TOOTH_STATE_TYPE | TOOTH_FACE_AFFECTION_TYPE | null =
    useAffectationState((state) => state.affectation);

  const handleToothClick = useCallback(
    (tooth: IToothObject, face?: FACE_TYPE) => {
      useOdontogramStore.setState((state) => {
        const newData: ITeethList = {
          permanent: Object.fromEntries(
            Object.entries(state.odontogramData.permanent).map(
              ([key, quadrant]) => [
                key as QuadrantKey,
                quadrant.map((t) => {
                  if (t.tooth_number !== tooth.tooth_number) return t;

                  if (
                    face &&
                    ARRAY_FACE_AFFECTIONS.includes(
                      (selectedAffection as TOOTH_FACE_AFFECTION_TYPE) ||
                        TOOTH_STATE,
                    )
                  ) {
                    return {
                      ...t,
                      [face]: selectedAffection as TOOTH_FACE_AFFECTION,
                    };
                  }

                  if (
                    !ARRAY_FACE_AFFECTIONS.includes(
                      selectedAffection as TOOTH_FACE_AFFECTION_TYPE,
                    )
                  ) {
                    return {
                      ...t,
                      general_state: selectedAffection as TOOTH_STATE,
                    };
                  }

                  if (selectedAffection === 'healthy') {
                    return { ...t, general_state: TOOTH_STATE.HEALTHY };
                  }

                  return t;
                }),
              ],
            ),
          ) as Record<QuadrantKey, IToothObject[]>,
          temporary: Object.fromEntries(
            Object.entries(state.odontogramData.temporary).map(
              ([key, quadrant]) => [
                key as TemporaryQuadrantKey,
                quadrant.map((t) => {
                  if (t.tooth_number !== tooth.tooth_number) return t;

                  if (
                    face &&
                    ARRAY_FACE_AFFECTIONS.includes(
                      (selectedAffection as TOOTH_FACE_AFFECTION_TYPE) ||
                        TOOTH_STATE,
                    )
                  ) {
                    return {
                      ...t,
                      [face]: selectedAffection as TOOTH_FACE_AFFECTION,
                    };
                  }

                  if (
                    !ARRAY_FACE_AFFECTIONS.includes(
                      selectedAffection as TOOTH_FACE_AFFECTION_TYPE,
                    )
                  ) {
                    return {
                      ...t,
                      general_state: selectedAffection as TOOTH_STATE,
                    };
                  }

                  if (selectedAffection === 'healthy') {
                    return { ...t, general_state: TOOTH_STATE.HEALTHY };
                  }

                  return t;
                }),
              ],
            ),
          ) as Record<TemporaryQuadrantKey, IToothObject[]>,
        };

        return { odontogramData: newData };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedAffection, setOdontogramData],
  );

  useEffect(() => {
    const updatedData = combineTeethData(
      CONSTANTTEETHLIST,
      backendModifiedTeeth,
    );

    setOdontogramData(updatedData);
  }, [backendModifiedTeeth, setOdontogramData]);

  return {
    odontogramData,
    handleToothClick,
  };
}

export default useOdontogramForm;
