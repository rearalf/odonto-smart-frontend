import type { IBasicIdNameDescription } from '@type/common.types';

export interface IListDoctors {
  id: number;
  specialty: IBasicIdNameDescription;
  secondary_specialties: IBasicIdNameDescription[];
  qualification: string;
  profile_picture: string;
  full_name: string;
  email: string;
}

export interface IDoctorDetail {
  id: 1;
  qualification: string;
  specialty: IBasicIdNameDescription;
  specialties: IBasicIdNameDescription[];
  full_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  roles: IBasicIdNameDescription[];
  permissions: IBasicIdNameDescription[];
}
