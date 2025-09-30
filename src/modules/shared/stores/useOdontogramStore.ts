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

    const compareKeys: (keyof IToothObject)[] = [
      'general_state',
      'palatina',
      'distal',
      'mesial',
      'vestibular',
      'oclusal',
    ];

    const currentTeeth: IToothObject[] = [
      ...Object.values(odontogramData.permanent).flat(),
      ...Object.values(odontogramData.temporary).flat(),
    ];

    const constantBase: IToothObject[] = [
      ...Object.values(CONSTANTTEETHLIST.permanent).flat(),
      ...Object.values(CONSTANTTEETHLIST.temporary).flat(),
    ];
    const constantMap = new Map<number, IToothObject>(
      constantBase.map((t) => [t.tooth_number, t]),
    );

    const originalMap = new Map<number, IToothObject>();
    if (originalOdontogram && originalOdontogram.length > 0) {
      originalOdontogram.forEach((t) => {
        if (t && typeof t.tooth_number === 'number')
          originalMap.set(t.tooth_number, t);
      });
    }

    const baselineFor = (toothNumber: number): IToothObject | undefined => {
      return originalMap.get(toothNumber) ?? constantMap.get(toothNumber);
    };

    currentTeeth.forEach((updated) => {
      const baseline = baselineFor(updated.tooth_number);
      if (!baseline) return;

      const isDifferent = compareKeys.some(
        (k) => (baseline as any)[k] !== (updated as any)[k],
      );

      if (isDifferent) modifiedTeeth.push(updated);
    });

    return modifiedTeeth;
  },
}));

export default useOdontogramStore;
