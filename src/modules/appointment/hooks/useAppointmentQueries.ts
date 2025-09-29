import { useMutation } from '@tanstack/react-query';

import { createInstantAppointment } from '../services/appointment.service';
import type { IAppointmentInstant } from '../types/index.types';

export const useCreateInstantAppointment = () => {
  return useMutation({
    mutationFn: async (appointmentInstant: IAppointmentInstant) =>
      createInstantAppointment(appointmentInstant),
  });
};
