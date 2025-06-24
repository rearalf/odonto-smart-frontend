import { axiosInstance } from '@api/axios/axiosInstance';
import { doctorEndpoints } from '@api/endpoints';
import { handleError } from '@utils/handleError';
import type { AxiosError } from 'axios';

export const createDoctor = async (doctorData: FormData) => {
  try {
    const response = await axiosInstance.post(
      doctorEndpoints.createDoctor,
      doctorData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};
