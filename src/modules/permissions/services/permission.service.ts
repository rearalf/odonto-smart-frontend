import type { AxiosError } from 'axios';

import { axiosInstance } from '@api/axiosInstance';
import { handleError } from '@utils/handleError';
import type {
  IPermissionGrouped,
  IBasicIdNameDescription,
} from '@type/common.types';

export const getAllPermission = async () => {
  try {
    const response =
      await axiosInstance.get<IBasicIdNameDescription[]>('/permission');
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};

export const getAllPermissionGrouped = async () => {
  try {
    const response = await axiosInstance.get<IPermissionGrouped[]>(
      '/permission/grouped',
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
