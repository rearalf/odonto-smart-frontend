import { create } from 'zustand';

interface IUseLoadingStore {
  loading: boolean;
  handleLoading: (value?: boolean) => void;
}

const useLoadingStore = create<IUseLoadingStore>((set) => ({
  loading: false,
  handleLoading: (value) =>
    set((state) => ({ loading: value || !state.loading })),
}));

export default useLoadingStore;
