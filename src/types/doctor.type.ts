import type { IBasicIdNameDescription } from './common.types';

export interface IListDoctors {
  id: number;
  specialty: IBasicIdNameDescription;
  secondary_specialties: IBasicIdNameDescription[];
  qualification: string;
  profile_picture: string;
  full_name: string;
  email: string;
}
