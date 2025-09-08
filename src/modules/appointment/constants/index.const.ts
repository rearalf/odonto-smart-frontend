import type { ILink } from '@components/BreadCrumbs/type';
import type { IAppointmentInstant } from '../types/index.types';
import dayjs from 'dayjs';

export const BREADCRUMBSNEWINSTANTAPPOINTMENT: ILink[] = [
  {
    link_name: 'Dashboard',
    link_to: '/',
  },
  {
    link_name: 'Citas',
    link_to: '/appointment',
  },
  {
    link_name: 'Crear cita instantanea',
    link_to: '/appointment/new-instant',
  },
];

export const INITIAL_VALUES_NEW_INSTANT_APPOINTMENT: IAppointmentInstant = {
  patient_id: 0,
  appointment_date: dayjs(new Date()),
  reason: '',
  notes: '',
  start_time: null,
  end_time: null,
  teeth: [],
};
