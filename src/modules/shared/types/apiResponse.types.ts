import type { AxiosError } from 'axios';

export interface IApiErrorData {
  error: string;
  message: string;
  statusCode: number;
}

export interface IApiResponse<T> {
  data?: T;
  success: boolean;
  status: number;
  error?: AxiosError | any;
  message?: string;
}

export interface IGetPaginationOptions {
  pagination?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  specialtyId?: number;
}

export interface IPagination {
  pagination?: boolean;
  page?: number;
  per_page?: number;
  total_count?: number;
  total_pages?: number;
}
