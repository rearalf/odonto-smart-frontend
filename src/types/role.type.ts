export interface ICreateRole {
  name: string;
  description: string;
  permission_id: number[];
}

export interface IListRoles {
  id: number;
  name: string;
  description: string;
  permissions: {
    id: number;
    name: string;
    label: string;
    description: string;
  }[];
}
