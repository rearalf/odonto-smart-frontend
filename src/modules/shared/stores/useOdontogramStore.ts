import type { ITeethList, IToothObject } from '@modules/odontogram/types/type';
import { create } from 'zustand';
import { CONSTANTTEETHLIST } from '../constans/teeth';

interface IOdontogramState {
  odontogramData: ITeethList;
  originalOdontogram: IToothObject[];
  setOriginalOdontogram: (data: IToothObject[]) => void;
  setOdontogramData: (data: ITeethList) => void;
  resetOdontogram: () => void;
  getModifiedTeeth: () => IToothObject[];
}

const useOdontogramStore = create<IOdontogramState>((set, get) => ({
  odontogramData: CONSTANTTEETHLIST,
  originalOdontogram: [],

  setOdontogramData: (data) => set({ odontogramData: data }),
  setOriginalOdontogram: (data) => set({ originalOdontogram: data }),

  resetOdontogram: () => set({ odontogramData: CONSTANTTEETHLIST }),

  getModifiedTeeth: () => {
    const modifiedTeeth: IToothObject[] = [];
    const { odontogramData, originalOdontogram } = get();

    // Crear un mapa del odontograma original por tooth_number
    const originalMap = new Map<number, IToothObject>();
    originalOdontogram.forEach((tooth) => {
      originalMap.set(tooth.tooth_number, tooth);
    });

    // Revisar todos los dientes actuales
    Object.values(odontogramData.permanent).forEach((quadrant) => {
      quadrant.forEach((updatedTooth) => {
        const origTooth = originalMap.get(updatedTooth.tooth_number);
        if (!origTooth) return; // No existe en el original, lo ignoramos

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

    Object.values(odontogramData.temporary).forEach((quadrant) => {
      quadrant.forEach((updatedTooth) => {
        const origTooth = originalMap.get(updatedTooth.tooth_number);
        if (!origTooth) return;

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

    return modifiedTeeth;
  },
}));

export default useOdontogramStore;
