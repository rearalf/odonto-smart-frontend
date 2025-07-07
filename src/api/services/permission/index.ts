import type { AxiosError } from 'axios';

import permissionEndpoints from '@api/endpoints/permission';
import { axiosInstance } from '@api/axios/axiosInstance';
import { handleError } from '@utils/handleError';
import type {
  IPermissionGrouped,
  IBasicIdNameDescription,
} from 'src/types/common.types';

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

export const getAllPermissionGrouped = async () => {
  try {
    const response = await axiosInstance.get<IPermissionGrouped[]>(
      permissionEndpoints.getAllPermissionsGrouped,
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
