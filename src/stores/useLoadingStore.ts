import { create } from 'zustand';

interface IUseLoadingStore {
  loading: boolean;
  handleLoading: () => void;
}

const useLoadingStore = create<IUseLoadingStore>((set) => ({
  loading: false,
  handleLoading: () => set((state) => ({ loading: !state.loading })),
}));

export default useLoadingStore;
