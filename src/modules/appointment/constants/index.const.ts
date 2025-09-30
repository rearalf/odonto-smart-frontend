import dayjs, { type Dayjs } from 'dayjs';

import type { HeaderObject } from '@components/TableComponent/type';
import type { IAppointmentInstant } from '../types/index.types';
import type { ILink } from '@components/BreadCrumbs/type';

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

export const BREADCRUMBSAPPOINTMENTLIST: ILink[] = [
  {
    link_name: 'Dashboard',
    link_to: '/',
  },
  {
    link_name: 'Citas',
    link_to: '/appointment',
  },
];

export const TABLE_HEADER_APPOINTMENTS: HeaderObject[] = [
  { title: 'Nombre completo', key: 'full_name' },
  { title: 'Edad', key: 'age', align: 'center' },
  {
    title: 'Fecha',
    key: 'appointment_date',
    align: 'center',
  },
  {
    title: 'Estado',
    key: 'status',
    align: 'center',
  },
  { title: 'Acciones', key: 'actions', align: 'center' },
];

const roundToNext30Minutes = (time: Dayjs) => {
  const minutes = time.minute();
  const remainder = minutes % 30;
  return remainder === 0
    ? time.startOf('minute')
    : time.add(30 - remainder, 'minute').startOf('minute');
};

const now = dayjs();

export const INITIAL_VALUES_NEW_INSTANT_APPOINTMENT: IAppointmentInstant = {
  patient_id: 0,
  appointment_date: dayjs(new Date()),
  reason: '',
  notes: '',
  start_time: roundToNext30Minutes(now),
  end_time: roundToNext30Minutes(now).add(30, 'minute'),
  teeth: [],
};
