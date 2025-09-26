import type { AxiosError } from 'axios';

import type { IOdontogramResponse } from '../types/type';
import { axiosInstance } from '@api/axiosInstance';
import { handleError } from '@utils/handleError';

export const getGeneralOdontogramByPatientId = async (patientId: number) => {
  try {
    const response = await axiosInstance.get<IOdontogramResponse>(
      `odontogram/general/${patientId}`,
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
