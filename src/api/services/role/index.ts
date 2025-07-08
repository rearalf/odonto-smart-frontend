import type { AxiosError } from 'axios';

import { axiosInstance } from '@api/axios/axiosInstance';
import { handleError } from '@utils/handleError';
import { roleEndpoints } from '@api/endpoints';

import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { ICreateRole, IListRoles } from 'src/types/role.type';
import type { IGetPaginationOptions } from 'src/types/apiResponse.types';

export const getAllRole = async () => {
  try {
    const response = await axiosInstance.get<IBasicIdNameDescription[]>(
      roleEndpoints.getAllRoles,
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};

export const createRole = async (params: ICreateRole) => {
  try {
    const response = await axiosInstance.post(roleEndpoints.createRole, params);
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};

export const listAllRole = async (options: IGetPaginationOptions = {}) => {
  try {
    const { pagination = true, page = 1, per_page = 10, search = '' } = options;

    const params: Record<string, any> = {
      pagination,
    };

    if (pagination) {
      params.page = page;
      params.per_page = per_page;
    }

    if (search) {
      params.search = search;
    }

    const response = await axiosInstance.get<IListRoles[]>(
      roleEndpoints.getAllRoles,
      { params },
    );

    return {
      data: response.data,
      pagination: pagination
        ? {
            total: Number(response.headers['total_count']),
            page: Number(response.headers['page']),
            per_page: Number(response.headers['per_page']),
            total_pages: Number(response.headers['total_pages']),
          }
        : null,
    };
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};

export const getOneRolebyId = async (id: number) => {
  try {
    const response = await axiosInstance.get<{
      id: number;
      name: string;
      description: string;
      permission: number[];
    }>(roleEndpoints.getAllRoles + '/' + id);
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};

export const updateRole = async (id: number, params: ICreateRole) => {
  try {
    const response = await axiosInstance.put(
      roleEndpoints.getAllRoles + '/' + id,
      params,
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
