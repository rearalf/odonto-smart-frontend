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
