interface IUsers {
  name: string;
  last_name: string;
  email: string;
  role: {
    id: number;
    name: string;
    description: string;
  }[];
  permission: {
    id: number;
    name: string;
    description: string;
  }[];
}
