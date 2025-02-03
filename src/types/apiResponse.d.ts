interface IApiErrorData {
  error: string;
  message: string;
  statusCode: number;
}

interface IApiResponse<T> {
  data?: T;
  success: boolean;
  status: number;
  error?: AxiosError | any;
  message?: string;
}
