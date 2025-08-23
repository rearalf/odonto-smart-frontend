import type { GENDER, IContactForm } from '@type/common.types';
import type { Dayjs } from 'dayjs';

export interface INewPatientFormValues {
  first_name: string;
  middle_name?: string;
  last_name: string;
  profile_picture_name?: string;
  profile_picture?: string;
  personContact: IContactForm[];
  address?: string;
  occupation?: string;
  complete_odontogram: boolean;
  birth_date: Dayjs | null;
  gender: GENDER | null;
}
