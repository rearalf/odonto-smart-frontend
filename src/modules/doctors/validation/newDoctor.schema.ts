import * as Yup from 'yup';

import { validateStrongPassword } from 'src/modules/shared/utils/passwordValidation';
import { CONTACT_TYPE_ENUM } from 'src/modules/shared/types/common.types';

const SALVADOR_PHONE_REGEX = /^(?:\+503[- ]?)?(2|6|7|9)\d{3}[- ]?\d{4}$/;

export const newDoctorSchema = Yup.object().shape({
  qualification: Yup.string(),
  specialty_id: Yup.number()
    .typeError('Debe seleccionar una especialidad principal')
    .required('Debe seleccionar una especialidad principal'),
  specialty_ids: Yup.array().of(Yup.number()),

  person: Yup.object({
    first_name: Yup.string().required('El nombre es obligatorio'),
    middle_name: Yup.string(),
    last_name: Yup.string().required('El apellido es obligatorio'),
    profile_picture_name: Yup.string(),
    profile_picture: Yup.string().url('Debe ser una URL válida'),

    user: Yup.object({
      email: Yup.string()
        .email('Debe ser un email válido')
        .required('El email es obligatorio'),
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
      role_ids: Yup.array()
        .of(Yup.number())
        .min(1, 'Debe seleccionar al menos un rol'),
      permission_ids: Yup.array().of(Yup.number()),
    }),

    personContact: Yup.array().of(
      Yup.object({
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
            'Tipo de contacto inválido',
          )
          .required('El tipo de contacto es obligatorio'),
      }),
    ),
  }),
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
