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
  signIn: (value: ISignIn) => void;
  logOut: () => void;
}
