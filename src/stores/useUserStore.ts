import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { USER_STORE } from '../utils/constants';

const useUserStore = create<IUseUserStore>()(
  persist(
    (set, _get) => ({
      ...USER_STORE,
      setUpdateAccessToken(token) {
        set((state) => ({
          ...state,
          access_token: token,
        }));
      },
      setShowAuthenticatedModa(value) {
        set((state) => ({
          ...state,
          showAuthenticatedModa: value,
        }));
      },
      signIn(value) {
        set({
          access_token: value.access_token,
          roles: [...value.roles],
          user: {
            email: value.email,
            last_name: value.last_name,
            name: value.name,
          },
          isAuthenticated: true,
        });
      },
      logOut() {
        localStorage.removeItem('session');
        set({
          ...USER_STORE,
        });
      },
    }),
    {
      name: 'session',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
