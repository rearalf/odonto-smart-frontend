import type { AxiosError } from 'axios';

export const handleError = (
  error: AxiosError,
): { data: null; message: string; status: string } => {
  return {
    data: null,
    message: error.message,
    status: error.response?.status.toString() || '500',
  };
};
