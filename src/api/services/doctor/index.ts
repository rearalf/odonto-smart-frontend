import { axiosInstance } from '@api/axios/axiosInstance';
import { doctorEndpoints } from '@api/endpoints';
import type { IGetPaginationOptions } from 'src/types/apiResponse.types';
import { handleError } from '@utils/handleError';
import type { AxiosError } from 'axios';
import type { IListDoctors } from 'src/types/doctor.type';

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

export const getAllDoctors = async (options: IGetPaginationOptions = {}) => {
  try {
    const {
      pagination = true,
      page = 1,
      per_page = 10,
      search = '',
      specialtyId,
    } = options;

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

    if (specialtyId) {
      params.specialtyId = specialtyId;
    }

    const response = await axiosInstance.get<IListDoctors[]>(
      doctorEndpoints.getAllDoctors,
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
