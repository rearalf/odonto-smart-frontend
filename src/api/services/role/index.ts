import { axiosInstance } from '@api/axios/axiosInstance';
import { roleEndpoints } from '@api/endpoints';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import { handleError } from '@utils/handleError';
import type { AxiosError } from 'axios';

export const getAllRole = async () => {
  try {
    const response = await axiosInstance.get<IBasicIdNameDescription[]>(
      roleEndpoints.getAllRoles,
    );
    return response;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};
