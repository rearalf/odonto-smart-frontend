import type { ILink } from '@components/BreadCrumbs/type';

import type { IFormValues } from '../types/newDoctor.types';
import {
  CONTACT_TYPE_ENUM,
  type IContactForm,
} from 'src/modules/shared/types/common.types';
import type { IRadioButtonComponentOption } from '@components/RadioButtonComponent/types';

export const BREADCRUMBS: ILink[] = [
  { link_name: 'Dashboard', link_to: '/' },
  { link_name: 'Doctores', link_to: '/doctor' },
  { link_name: 'Nuevo doctor', link_to: 'new-doctor' },
];

export const INITIAL_VALUES: IFormValues = {
  qualification: '',
  specialty_id: null,
  specialty_ids: [],
  person: {
    first_name: '',
    middle_name: '',
    last_name: '',
    profile_picture_name: '',
    profile_picture: '',
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      role_ids: [],
      permission_ids: [],
    },
    personContact: [],
  },
};

export const CONTACT_INITIAL_VALUES: IContactForm = {
  contact_type: CONTACT_TYPE_ENUM.EMAIL,
  contact_value: '',
};

export const CONTACT_OPTIONS: IRadioButtonComponentOption[] = [
  {
    value: CONTACT_TYPE_ENUM.EMAIL,
    label: 'Correo',
    color: '#0288d1',
  },
  {
    value: CONTACT_TYPE_ENUM.PHONE,
    label: 'Teléfono',
    color: '#2e7d32',
  },
  {
    value: CONTACT_TYPE_ENUM.WHATSAPP,
    label: 'WhatsApp',
    color: '#2e7d32',
  },
];
