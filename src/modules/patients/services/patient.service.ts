import { axiosInstance } from '@api/axiosInstance';
import type { AxiosError } from 'axios';

import { handleError } from '@utils/handleError';

export const createPatient = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/patient', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
