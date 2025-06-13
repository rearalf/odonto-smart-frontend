import type { MuiTelInputInfo } from 'mui-tel-input';
import type { FormikProps } from 'formik';
import type { ChangeEvent } from 'react';
import type {
  IContactForm,
  CONTACT_TYPE_TYPE,
  IBasicIdNameDescription,
} from 'src/types/common.types';

interface IUser {
  email: string;
  password: string;
  confirmPassword: string;
  role_ids: number[];
  permission_ids: number[];
}

interface IPerson {
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

export interface INewDoctorFormValues {
  first_name: string;
  middle_name: string;
  last_name: string;
  qualification: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialty: string | number;
  specialty_ids: number[];
  roles: number[];
  person_contact: IContactForm[];
}

export interface IFormStepTwoProps {
  contact: string;
  isLoadingSpecialty: boolean;
  contactType: CONTACT_TYPE_TYPE | '';
  specialties: IBasicIdNameDescription[];
  specialtiesBySelect: (number | string)[];
  formikProps: FormikProps<INewDoctorFormValues>;
  handleSetContactTyp: (event: ChangeEvent) => void;
  handleSetContactEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSetSpecialtiesBySelect: (newSet: (number | string)[]) => void;
  handleSetContactPhone: (value: string, info: MuiTelInputInfo) => void;
}
