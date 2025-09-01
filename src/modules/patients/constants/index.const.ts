import type { HeaderObject } from '@components/TableComponent/type';
import type { INewPatientFormValues } from '../types/types';
import type { ILink } from '@components/BreadCrumbs/type';

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
  address: '',
  occupation: '',
  complete_odontogram: false,
  birth_date: null,
  gender: null,
};

export const TABLE_HEADER_PATIENTS: HeaderObject[] = [
  { title: 'Nombre', key: 'name' },
  { title: 'Edad', key: 'age', align: 'center' },
  { title: 'Teléfono', key: 'phone', align: 'center' },
  { title: 'Acciones', key: 'actions', align: 'center' },
];
