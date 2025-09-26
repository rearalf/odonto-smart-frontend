import type { PickerValue } from '@mui/x-date-pickers/internals';
import type { IToothObject } from '../../odontogram/types/type';

export interface IAppointmentInstant {
  patient_id: number;
  doctor_id?: number;
  appointment_date: PickerValue | null;
  reason: string;
  notes?: string;
  start_time: PickerValue | null;
  end_time: PickerValue | null;
  teeth?: IToothObject[];
}
