import type { IContentNotification } from 'src/types/common';

export const USER_STORE = {
  user: {
    email: '',
    last_name: '',
    name: '',
  },
  roles: [],
  access_token: '',
  isAuthenticated: true,
  showAuthenticatedModa: false,
};

export const NOTIFICATION: IContentNotification = {
  show: false,
  severity: 'info',
  text: '',
};
