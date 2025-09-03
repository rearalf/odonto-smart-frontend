import { axiosInstance } from '@api/axiosInstance';
import type { AxiosError } from 'axios';

import { handleError } from '@utils/handleError';
import type { IPagination } from '@type/apiResponse.types';

export const createPatient = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/patient', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw handleError(error as AxiosError<{ message?: string }>);
  }
};

export const findAllPatients = async (
  options: IPagination & { search: string },
) => {
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

    const response = await axiosInstance.get('/patient', { params });

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
