import { create } from 'zustand';

interface IUseSidebarStore {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleOpenState: () => void;
}

const useSidebarStore = create<IUseSidebarStore>((set) => ({
  open: false,
  setOpen: (value) => set((state) => ({ ...state, open: value })),
  handleOpenState: () => set((state) => ({ ...state, open: !state.open })),
}));

export default useSidebarStore;
