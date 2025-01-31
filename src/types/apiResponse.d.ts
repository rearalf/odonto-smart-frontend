interface IApiResponse<T> {
  data?: T;
  success: boolean;
  status: number;
  error?: AxiosError | any;
  message?: string;
}
