import type { IBasicIdNameDescription } from './common.types';

export interface IListDoctor {
  id: number;
  fullName: string;
  specialty: string;
  email: string;
  role: IBasicIdNameDescription[];
}
