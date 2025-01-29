import { isAxiosError } from 'axios';
import axiosInstance from '../axios/axiosInstance';
import { userEndpoints } from '../endpoints';

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(userEndpoints.getAUsers);
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
    const response = await axiosInstance.get(userEndpoints.getUser(id));
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
