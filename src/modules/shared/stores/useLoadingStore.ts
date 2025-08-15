import { create } from 'zustand';

interface IUseLoadingStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
  toggleLoading: () => void;
}

const useLoadingStore = create<IUseLoadingStore>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
}));

export default useLoadingStore;
