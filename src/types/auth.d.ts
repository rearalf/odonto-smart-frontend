interface ISignInForm {
  email: string;
  password: string;
}

interface ISignIn {
  name: string;
  last_name: string;
  email: string;
  roles: {
    id: number;
    name: string;
  }[];
  access_token: string;
}

interface IRefresToken {
  access_token: string;
}

interface IUseUserStore {
  user: {
    name: string;
    last_name: string;
    email: string;
  };
  roles: {
    id: number;
    name: string;
  }[];
  access_token: string;
  isAuthenticated: boolean;
  showAuthenticatedModa: boolean;
  logOut: () => void;
  signIn: (value: ISignIn) => void;
  setShowAuthenticatedModa: (value: boolean) => void;
  setUpdateAccessToken: (token: string) => void;
}
