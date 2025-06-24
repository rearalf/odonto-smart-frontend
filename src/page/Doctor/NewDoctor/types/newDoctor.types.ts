import type { IContactForm } from 'src/types/common.types';

interface IUser {
  email: string;
  password: string;
  confirmPassword: string;
  role_ids: number[];
  permission_ids: number[];
}

export interface IPerson {
  first_name: string;
  middle_name?: string;
  last_name: string;
  // person_type_id: number;
  profile_picture_name?: string;
  profile_picture?: string;
  user: IUser;
  personContact: IContactForm[];
}

export interface IFormValues {
  qualification: string;
  specialty_id: number;
  specialty_ids: number[];
  person: IPerson;
}

export interface INewDoctorPersonFormData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  profile_picture_name?: string;
  profile_picture?: string;
  personContact?: IContactForm[];
  person_type_id: 4;
  user: {
    email: string;
    password: string;
    role_ids: number[];
    permission_ids?: number[];
  };
}
