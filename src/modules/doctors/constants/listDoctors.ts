import type { ILink } from '@components/BreadCrumbs/type';
import type { HeaderObject } from '@components/TableComponent/type';

export const TABLE_HEADER_DOCTORS: HeaderObject[] = [
  { title: 'Nombre completo', key: 'full_name' },
  { title: 'Correo', key: 'email', align: 'center' },
  {
    title: 'Especialidad principal',
    key: 'specialty',
    align: 'center',
  },
  {
    title: 'Especialidades secundarias',
    key: 'secondary_specialties',
    align: 'center',
  },
  { title: 'Acciones', key: 'actions', align: 'center' },
];

export const BREADCRUMBS: ILink[] = [
  {
    link_name: 'Dashboard',
    link_to: '/',
  },
  {
    link_name: 'Doctores',
    link_to: '/doctor',
  },
];
