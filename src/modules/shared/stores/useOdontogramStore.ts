import type { ITeethList, IToothObject } from '@modules/odontogram/types/type';
import { create } from 'zustand';
import { CONSTANTTEETHLIST } from '../constans/teeth';

interface IOdontogramState {
  odontogramData: ITeethList;
  setOdontogramData: (data: ITeethList) => void;
  resetOdontogram: () => void;
  getModifiedTeeth: () => IToothObject[];
}

const useOdontogramStore = create<IOdontogramState>((set, get) => ({
  odontogramData: CONSTANTTEETHLIST,

  setOdontogramData: (data) => set({ odontogramData: data }),

  resetOdontogram: () => set({ odontogramData: CONSTANTTEETHLIST }),

  getModifiedTeeth: () => {
    const modifiedTeeth: IToothObject[] = [];
    const { odontogramData } = get();

    const compareQuadrants = (
      original: Record<string, IToothObject[]>,
      updated: Record<string, IToothObject[]>,
    ) => {
      Object.keys(original).forEach((key) => {
        original[key].forEach((origTooth, index) => {
          const updatedTooth = updated[key][index];

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
  },
}));

export default useOdontogramStore;
