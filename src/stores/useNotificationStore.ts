import { create } from 'zustand';
import { NOTIFICATION } from '../utils/constants';

interface IUseNotificationStore extends IContentNotification {
  handleShowNotification: (value: IContentNotification) => void;
  handleClearNotification: () => void;
}

const useNotificationStore = create<IUseNotificationStore>((set) => ({
  ...NOTIFICATION,
  handleShowNotification(value) {
    set((states) => ({
      ...states,
      ...value,
    }));
  },
  handleClearNotification() {
    set((states) => ({
      ...states,
      ...NOTIFICATION,
    }));
  },
}));

export default useNotificationStore;
