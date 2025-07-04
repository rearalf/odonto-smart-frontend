import type { ILink } from 'src/types/BreadCrumbsComponent.type';
import type { IFormValues } from '../types';

export const BREADCRUMBS: ILink[] = [
  { link_name: 'Dashboard', link_to: '/' },
  { link_name: 'Roles', link_to: '/rol' },
];

export const INITIAL_VALUES: IFormValues = {
  name: '',
  description: '',
  permission_id: [],
};
