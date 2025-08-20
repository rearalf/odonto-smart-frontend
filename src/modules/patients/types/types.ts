import type { IContactForm } from '@type/common.types';

export interface INewPatientFormValues {
  first_name: string;
  middle_name?: string;
  last_name: string;
  profile_picture_name?: string;
  profile_picture?: string;
  personContact: IContactForm[];
}
