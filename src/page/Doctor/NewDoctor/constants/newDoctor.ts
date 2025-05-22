import type { ILink } from 'src/types/components';

export const STEPS = [
  'Formulario principal',
  'Agregar especialidades y contactos',
  'Agregar roles y permisos',
];

export const BREADCRUMBS: ILink[] = [
  { link_name: 'Dashboard', link_to: '/' },
  { link_name: 'Doctores', link_to: '/doctor' },
  { link_name: 'Nuevo doctor', link_to: 'new-doctor' },
];
