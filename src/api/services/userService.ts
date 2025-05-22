import { isAxiosError } from 'axios';

import { axiosInstanceWithAuth } from '../axios/axiosInstance';
import { userEndpoints } from '../endpoints';

import type { IApiErrorData, IApiResponse } from 'src/types/apiResponse';
import type { IUsers } from 'src/types/user';

export const getUsers = async (): Promise<
  IApiResponse<IUsers[] & IApiErrorData>
> => {
  try {
    const response = await axiosInstanceWithAuth.get(userEndpoints.getAUsers);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error,
        success: false,
        message: error.message,
        data: error.response?.data,
        status: error.status ? error.status : 500,
      };
    }
    return {
      success: false,
      status: 500,
      error,
    };
  }
};

export const getUser = async (id: number) => {
  try {
    const response = await axiosInstanceWithAuth.get(userEndpoints.getUser(id));
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: error.status,
        message: error.message,
        error,
      };
    }
    return {
      status: 500,
      error,
    };
  }
};
