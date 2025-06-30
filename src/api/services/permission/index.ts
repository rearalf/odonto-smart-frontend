import { axiosInstance } from '@api/axios/axiosInstance';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import { handleError } from '@utils/handleError';
import type { AxiosError } from 'axios';
import permissionEndpoints from '@api/endpoints/permission';

export const getAllPermission = async () => {
  try {
    const response = await axiosInstance.get<IBasicIdNameDescription[]>(
      permissionEndpoints.getAllPermissions,
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
