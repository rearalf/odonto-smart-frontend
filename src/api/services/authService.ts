import { axiosInstance, axiosInstanceWithAuth } from '../axios/axiosInstance';
import { authEndpoints } from '../endpoints';
import { isAxiosError } from 'axios';

export const signin = async (
  credentials: ISignInForm,
): Promise<IApiResponse<ISignIn & IApiErrorData>> => {
  try {
    const response = await axiosInstance.post(
      authEndpoints.signin,
      credentials,
    );
    return {
      data: response.data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        status: error.status ? error.status : 500,
        data: error.response?.data,
        message: error.message,
        error,
      };
    }
    return {
      success: false,
      status: 500,
      error,
    };
  }
};

export const logout = async (): Promise<IApiResponse<{ message: string }>> => {
  try {
    const response = await axiosInstanceWithAuth.post(authEndpoints.logout, {});

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        status: error.status ? error.status : 500,
        message: error.message,
        error,
      };
    }
    return {
      success: false,
      status: 500,
      error,
    };
  }
};

export const refreshToken = async (): Promise<IApiResponse<IRefresToken>> => {
  try {
    const response = await axiosInstanceWithAuth.post(
      authEndpoints.refreshToken,
      {},
    );

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        status: error.status ? error.status : 500,
        message: error.message,
        error,
      };
    }
    return {
      success: false,
      status: 500,
      error,
    };
  }
};
