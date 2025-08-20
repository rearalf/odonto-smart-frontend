import type { ILink } from '@components/BreadCrumbs/type';
import type { INewPatientFormValues } from '../types/types';

export const BREADCRUMBSPATIENTSLIST: ILink[] = [
  {
    link_name: 'Dashboard',
    link_to: '/',
  },
  {
    link_name: 'Pacientes',
    link_to: '/patient',
  },
];

export const BREADCRUMBSNEWPATIENT: ILink[] = [
  {
    link_name: 'Dashboard',
    link_to: '/',
  },
  {
    link_name: 'Pacientes',
    link_to: '/patient',
  },
  {
    link_name: 'Nuevo Paciente',
    link_to: '/patient/new-patient',
  },
];

export const INITIAL_VALUES: INewPatientFormValues = {
  first_name: '',
  middle_name: '',
  last_name: '',
  profile_picture_name: '',
  profile_picture: '',
  personContact: [],
};
