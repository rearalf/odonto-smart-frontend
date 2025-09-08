import type { IToothObject } from './teeth.type';

export interface IAppointmentInstant {
  patient_id: number;
  doctor_id?: number;
  appointment_date: string;
  reason: string;
  notes?: string;
  start_time: string;
  end_time: string;
  teeth: IToothObject[];
}
