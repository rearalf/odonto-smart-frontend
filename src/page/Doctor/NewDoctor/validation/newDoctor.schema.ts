import * as Yup from 'yup';

import { validateStrongPassword } from '@utils/passwordValidation';

import type { INewDoctorFormValues } from '../types/newDoctor.types';
import { CONTACT_TYPE_ENUM, type IContactForm } from 'src/types/common.types';

export const doctorSchemaStepOne = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .required('El primer nombre es obligatorio.')
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, 'Solo se permiten letras.'),
  middle_name: Yup.string()
    .trim()
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, 'Solo se permiten letras.'),
  last_name: Yup.string()
    .trim()
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, 'Solo se permiten letras.')
    .required('Los apellidos son obligatorios.'),
  qualification: Yup.string().trim(),
  email: Yup.string()
    .trim()
    .email('Correo invalido.')
    .required('El correo es obligatorio.'),
  password: Yup.string()
    .trim()
    .min(1, 'Deben de ser mínimo 8 caracteres.')
    .required('La contraseña es requerida.')
    .test(
      'is-strong',
      'La contraseña debe incluir mayúsculas, minúsculas, números y símbolos especiales.',
      function (value) {
        return validateStrongPassword(value, this);
      },
    ),
  confirmPassword: Yup.string()
    .trim()
    .min(1, 'Deben de ser mínimo 8 caracteres.')
    .required('La contraseña es requerida.')
    .oneOf([Yup.ref('password')], 'Las contraseñas deben de ser iguales')
    .test(
      'is-strong',
      'La contraseña debe incluir mayúsculas, minúsculas, números y símbolos especiales.',
      function (value) {
        return validateStrongPassword(value, this);
      },
    ),
  specialty: Yup.number()
    .typeError('El doctor debe tener una especialidad.')
    .required('El doctor debe tener una especialidad.'),
});

export const doctorSchemaStepTwo = Yup.object().shape({
  specialty_ids: Yup.array().of(
    Yup.number().typeError('Cada especialidad debe ser un número'),
  ),
  person_contact: Yup.array().of(
    Yup.object()
      .shape({
        contact_value: Yup.string().required(
          'El valor de contacto es obligatorio',
        ),
        contact_type: Yup.string()
          .oneOf(
            [
              CONTACT_TYPE_ENUM.EMAIL,
              CONTACT_TYPE_ENUM.PHONE,
              CONTACT_TYPE_ENUM.WHATSAPP,
            ],
            'El tipo de contacto debe ser EMAIL o PHONE',
          )
          .required('El tipo de contacto es obligatorio'),
      })
      .test(
        'validate-contact',
        'El contacto no es válido para el tipo seleccionado',
        function ({ contact_type, contact_value }) {
          if (contact_type === CONTACT_TYPE_ENUM.EMAIL) {
            return Yup.string()
              .email('El valor debe ser un correo electrónico')
              .isValidSync(contact_value);
          }

          if (contact_type === CONTACT_TYPE_ENUM.PHONE) {
            const phoneRegex = /^[267]\d{7}$/;
            return phoneRegex.test(contact_value);
          }

          if (contact_type === CONTACT_TYPE_ENUM.WHATSAPP) {
            const whatsappRegex = /^[267]\d{7}$/;
            return whatsappRegex.test(contact_value);
          }

          return true;
        },
      ),
  ),
});

export const contactSchema = Yup.object().shape({
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
    'El valor de contacto no es válido',
    function (value) {
      const { contact_type } = this.parent;

      if (value === undefined) return true;

      if (contact_type === CONTACT_TYPE_ENUM.EMAIL) {
        return Yup.string().email().isValidSync(value);
      } else if (
        (contact_type === CONTACT_TYPE_ENUM.PHONE ||
          contact_type === CONTACT_TYPE_ENUM.WHATSAPP) &&
        value
      ) {
        const phoneRegex = /^[0-9]{8}(?: [0-9]{1,2})?$/;

        if (!phoneRegex.test(value)) return false;

        const digits = value.replace(/\D/g, '');
        if (digits.length > 8 || (value.match(/ /g) || []).length > 1)
          return false;

        return true;
      }
      return false;
    },
  ),
});

export const doctorInitialValues: INewDoctorFormValues = {
  first_name: '',
  middle_name: '',
  last_name: '',
  qualification: '',
  email: '',
  password: '',
  confirmPassword: '',
  specialty: '',
  specialty_ids: [],
  roles: [],
  person_contact: [],
};

export const contactInitialValues: IContactForm = {
  contact_type: 'WHATSAPP',
  contact_value: '',
};
