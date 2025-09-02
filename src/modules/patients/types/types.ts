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
  phone?: string;
  occupation?: string;
  complete_odontogram: boolean;
  birth_date: Dayjs | null;
  gender: GENDER | null;
  medical_history?: string;
  allergic_reactions?: string;
  current_systemic_treatment?: string;
  lab_results?: string;
  snc?: boolean;
  svc?: boolean;
  se?: boolean;
  sme?: boolean;
  systemNotes1?: string;
  sr?: boolean;
  su?: boolean;
  sgu?: boolean;
  sgi?: boolean;
  systemNotes2?: string;
}
