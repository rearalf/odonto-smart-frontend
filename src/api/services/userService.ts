import { axiosInstanceWithAuth } from '../axios/axiosInstance';
import { userEndpoints } from '../endpoints';
import { isAxiosError } from 'axios';

export const getUsers = async () => {
  try {
    const response = await axiosInstanceWithAuth.get(userEndpoints.getAUsers);
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
