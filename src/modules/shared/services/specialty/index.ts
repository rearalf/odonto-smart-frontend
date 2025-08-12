import { axiosInstance } from '@api/axiosInstance';
import { handleError } from 'src/modules/shared/utils/handleError';

import type { IBasicIdNameDescription } from 'src/modules/shared/types/common.types';
import type { AxiosError } from 'axios';

export const getAllSpecialty = async () => {
  try {
    const response =
      await axiosInstance.get<IBasicIdNameDescription[]>('/specialty');
    return response;
  } catch (error) {
    return handleError(error as AxiosError<{ message?: string }>);
  }
};
