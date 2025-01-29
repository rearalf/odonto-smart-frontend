import { isAxiosError } from 'axios';
import axiosInstance from '../axios/axiosInstance';
import { authEndpoints } from '../endpoints';

export const signin = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(
      authEndpoints.signin,
      credentials,
    );
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

export const logout = async () => {
  try {
    const response = await axiosInstance.post(authEndpoints.logout);
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
