import { CONTACT_TYPE_ENUM, GENDER } from '@type/common.types';
import * as Yup from 'yup';
import dayjs from 'dayjs';

export const newPatientSchema = Yup.object().shape({
  first_name: Yup.string().required('El nombre es obligatorio'),
  middle_name: Yup.string(),
  last_name: Yup.string().required('El apellido es obligatorio'),
  profile_picture_name: Yup.string(),
  profile_picture: Yup.string().url('Debe ser una URL válida'),
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

  birth_date: Yup.date()
    .nullable()
    .required('La fecha de nacimiento es obligatoria')
    .max(
      dayjs().subtract(1, 'year'),
      'El paciente debe tener al menos 1 año de edad',
    )
    .min(
      dayjs().subtract(100, 'year'),
      'La fecha no puede ser mayor a 100 años atrás',
    ),
  phone: Yup.string(),
  address: Yup.string(),
  occupation: Yup.string(),
  medical_history: Yup.string(),
  allergic_reactions: Yup.string(),
  current_systemic_treatment: Yup.string(),
  lab_results: Yup.string(),
  complete_odontogram: Yup.boolean().default(false),
  gender: Yup.string()
    .oneOf([GENDER.FEMALE, GENDER.MALE, GENDER.OTHER], 'Género inválido')
    .required('El género es obligatorio'),
  snc: Yup.boolean().default(false),
  svc: Yup.boolean().default(false),
  se: Yup.boolean().default(false),
  sme: Yup.boolean().default(false),
  systemNotes1: Yup.string(),
  sr: Yup.boolean().default(false),
  su: Yup.boolean().default(false),
  sgu: Yup.boolean().default(false),
  sgi: Yup.boolean().default(false),
  systemNotes2: Yup.string(),
});
