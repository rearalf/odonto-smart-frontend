import * as Yup from 'yup';

import type { IRadioButtonComponentOption } from '@components/RadioButtonComponent/types';
import {
  CONTACT_TYPE_ENUM,
  type IContactForm,
  type IContentNotification,
} from '@type/common.types';

export const SALVADOR_PHONE_REGEX = /^(?:\+503[- ]?)?(2|6|7|9)\d{3}[- ]?\d{4}$/;

export const NOTIFICATION: IContentNotification = {
  show: false,
  severity: 'info',
  text: '',
};

export const CONTACT_SCHEMA = Yup.object().shape({
  contact_type: Yup.string()
    .oneOf(
      [
        CONTACT_TYPE_ENUM.EMAIL,
        CONTACT_TYPE_ENUM.PHONE,
        CONTACT_TYPE_ENUM.WHATSAPP,
      ],
      'El tipo de contacto debe ser EMAIL, PHONE o WHATSAPP',
    )
    .required('El tipo de contacto es obligatorio'),

  contact_value: Yup.string().test(
    'contact-validation',
    'El número no es válido. Debe tener 8 dígitos y empezar con 2, 6, 7 o 9.',
    function (value) {
      const { contact_type } = this.parent;
      if (!value) return false;

      if (contact_type === CONTACT_TYPE_ENUM.EMAIL) {
        return Yup.string().email().isValidSync(value);
      }

      if (
        contact_type === CONTACT_TYPE_ENUM.PHONE ||
        contact_type === CONTACT_TYPE_ENUM.WHATSAPP
      ) {
        const digits = value.replace(/\D/g, '');
        if (digits.length !== 8 && digits.length !== 11) return false;
        return SALVADOR_PHONE_REGEX.test(value);
      }
      return false;
    },
  ),
});

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
