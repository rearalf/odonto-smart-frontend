import type { ITeethList, IToothObject } from '../types/type';

export function combineTeethData(
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
