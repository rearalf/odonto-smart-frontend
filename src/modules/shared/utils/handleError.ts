import type { AxiosError } from 'axios';

export const handleError = (
  error: AxiosError<{ message?: string }>,
): { data: null; message: string; status: string } => {
  return {
    data: null,
    message:
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message,
    status: error.response?.status.toString() || '500',
  };
};
