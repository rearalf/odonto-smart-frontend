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

export interface IPatient {
  id: number;
  address: string | null;
  age: number;
  allergic_reactions: string | null;
  birth_date: string;
  complete_odontogram: boolean;
  current_systemic_treatment: string | null;
  fullName: string;
  gender: GENDER;
  lab_results: string | null;
  medical_history: string | null;
  occupation: string | null;
  person_id: number;
  phone: string | null;
  se: boolean;
  sgi: boolean;
  sgu: boolean;
  sme: boolean;
  snc: boolean;
  sr: boolean;
  su: boolean;
  svc: boolean;
  systemNotes1: string | null;
  systemNotes2: string | null;
}
