import { axiosInstance } from '@api/axiosInstance';
import type { AxiosError } from 'axios';

import type { IBasicIdNameDescription } from '@type/common.types';
import { handleError } from '@utils/handleError';

export const getDoctorsList = async () => {
  try {
    const response =
      await axiosInstance.get<IBasicIdNameDescription[]>('/doctor/list');
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
