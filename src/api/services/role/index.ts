import { axiosInstance } from '@api/axios/axiosInstance';
import { roleEndpoints } from '@api/endpoints';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import { handleError } from '@utils/handleError';
import type { AxiosError } from 'axios';
import type { ICreateRole } from 'src/types/role.type';

export const getAllRole = async () => {
  try {
    const response = await axiosInstance.get<IBasicIdNameDescription[]>(
      roleEndpoints.getAllRoles,
    );
    return response;
  } catch (error) {
    return handleError(error as AxiosError<{ message?: string }>);
  }
};

export const createRole = async (params: ICreateRole) => {
  try {
    const response = await axiosInstance.post(roleEndpoints.createRole, params);
    return response;
  } catch (error) {
    return handleError(error as AxiosError<{ message?: string }>);
  }
};
