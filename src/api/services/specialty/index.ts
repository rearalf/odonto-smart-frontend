import specialtyEndpoints from '@api/endpoints/specialty';
import { axiosInstance } from '@api/axios/axiosInstance';
import { handleError } from '@utils/handleError';

import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { AxiosError } from 'axios';

export const getAllSpecialty = async () => {
  try {
    const response = await axiosInstance.get<IBasicIdNameDescription[]>(
      specialtyEndpoints.getSpecialties,
    );
    return response;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};
