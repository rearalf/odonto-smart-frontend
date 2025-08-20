import type { FormikProps } from 'formik';
import type { IContactForm } from 'src/modules/shared/types/common.types';

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
  specialty_id: number | null;
  specialty_ids: number[];
  person: IPerson;
}

export interface IComponentFormProps {
  formikProps: FormikProps<IFormValues>;
}

export interface IContactCardProps extends IComponentFormProps {
  contact: IContactForm;
  index: number;
}
