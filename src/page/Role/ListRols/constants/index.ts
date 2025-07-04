import type { ILink } from 'src/types/BreadCrumbsComponent.type';
import type { IFormValues } from '../types';
import type { HeaderObject } from 'src/types/TableComponent.type';

export const BREADCRUMBS: ILink[] = [
  { link_name: 'Dashboard', link_to: '/' },
  { link_name: 'Roles', link_to: '/rol' },
];

export const INITIAL_VALUES: IFormValues = {
  name: '',
  description: '',
  permission_id: [],
};

export const TABLE_HEADER_ROLES: HeaderObject[] = [
  { title: 'Nombre', key: 'name' },
  { title: 'Descripción', key: 'description' },
  { title: 'Acciones', key: 'actions', align: 'center' },
];
