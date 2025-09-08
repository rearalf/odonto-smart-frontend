import type { AxiosError } from 'axios';

import { axiosInstance } from '@api/axiosInstance';
import { handleError } from '@utils/handleError';

export const getGeneralOdontogramByPatientId = async (patientId: number) => {
  try {
    const response = await axiosInstance.get(`odontogram/general/${patientId}`);
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
