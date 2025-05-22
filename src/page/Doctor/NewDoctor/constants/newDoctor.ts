import type { ILink } from 'src/types/components';
import {
  CONTACT_TYPE_ENUM,
  type IRadioButtonOptions,
} from 'src/types/common.types';

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

export const CONTACT_TYPE: IRadioButtonOptions[] = Object.values(
  CONTACT_TYPE_ENUM,
).map((value) => ({
  value,
  label: value.charAt(0) + value.slice(1).toLowerCase(),
}));
