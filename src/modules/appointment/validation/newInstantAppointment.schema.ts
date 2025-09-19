import * as Yup from 'yup';
import dayjs from 'dayjs';

import { TOOTH_FACE_AFFECTION, TOOTH_STATE } from '../../odontogram/types/type';
import { MODULES } from '@config/modules';

export const newInstantAppointmentSchema = Yup.object().shape({
  patient_id: Yup.number().required('El paciente es obligatorio'),
  doctor_id: MODULES.doctors
    ? Yup.number().required('El doctor es obligatorio')
    : Yup.number().optional(),

  appointment_date: Yup.mixed<dayjs.Dayjs>()
    .nullable()
    .test('is-dayjs', 'La fecha debe ser válida', (value) => {
      return value === null || (dayjs.isDayjs(value) && value.isValid());
    })
    .required('La fecha de la cita es obligatoria'),
  reason: Yup.string().required('El motivo es obligatorio'),
  notes: Yup.string().optional(),

  start_time: Yup.string().required('La hora de inicio es obligatoria'),
  end_time: Yup.string().required('La hora de fin es obligatoria'),

  teeth: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().optional(),
      tooth_number: Yup.number().required(
        'El número del diente es obligatorio',
      ),
      general_state: Yup.string()
        .oneOf(Object.values(TOOTH_STATE), 'Estado inválido')
        .required('El estado general es obligatorio'),
      palatina: Yup.string()
        .oneOf(Object.values(TOOTH_FACE_AFFECTION), 'Afección inválida')
        .required('La cara palatina es obligatoria'),
      distal: Yup.string()
        .oneOf(Object.values(TOOTH_FACE_AFFECTION), 'Afección inválida')
        .required('La cara distal es obligatoria'),
      mesial: Yup.string()
        .oneOf(Object.values(TOOTH_FACE_AFFECTION), 'Afección inválida')
        .required('La cara mesial es obligatoria'),
      vestibular: Yup.string()
        .oneOf(Object.values(TOOTH_FACE_AFFECTION), 'Afección inválida')
        .required('La cara vestibular es obligatoria'),
      oclusal: Yup.string()
        .oneOf(Object.values(TOOTH_FACE_AFFECTION), 'Afección inválida')
        .required('La cara oclusal es obligatoria'),
    }),
  ),
});
