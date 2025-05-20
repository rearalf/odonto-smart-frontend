import * as Yup from 'yup';

import { validateStrongPassword } from '@utils/passwordValidation';
import { INewDoctorFormValues } from '../types/newDoctor.types';

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
  specialties: Yup.array().of(
    Yup.number().typeError('Cada especialidad debe ser un número'),
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
  specialties: [],
  roles: [],
};
