import specialtyEndpoints from '@api/endpoints/specialty';
import { axiosInstance } from '@api/axios/axiosInstance';

export const getAllSpecialty = async (): Promise<IBasicIdNameDescription[]> => {
  const response = await axiosInstance.get(specialtyEndpoints.getSpecialties);
  return response.data;
};
