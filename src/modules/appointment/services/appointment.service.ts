import type { AxiosError } from 'axios';

import type { IAppointmentInstant } from '../types/index.types';
import { axiosInstance } from '@api/axiosInstance';
import { handleError } from '@utils/handleError';

export const createInstantAppointment = async (
  appointmentInstant: IAppointmentInstant,
) => {
  try {
    const response = await axiosInstance.post(
      'appointment/instant',
      appointmentInstant,
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
