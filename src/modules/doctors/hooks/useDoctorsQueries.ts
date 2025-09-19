import { useMutation, useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';

import {
  createDoctor,
  getOneDoctor,
  getAllDoctors,
  getDoctorsList,
} from '../services/doctors.service';

import type { IGetPaginationOptions } from '@modules/shared/types/apiResponse.types';

export const useCreateDoctor = () => {
  return useMutation({
    mutationFn: async (doctorData: FormData) => createDoctor(doctorData),
  });
};

export const useGetAllDoctorsQuery = (options: IGetPaginationOptions = {}) => {
  const deferredSearch = useDeferredValue(options.search);
  const deferredSpecialtyId = useDeferredValue(options.specialtyId);

  const queryOptions: IGetPaginationOptions = {
    ...options,
    search: deferredSearch,
    specialtyId: deferredSpecialtyId,
  };

  return useQuery({
    queryKey: ['doctors', queryOptions],
    queryFn: () => getAllDoctors(queryOptions),
    enabled: true,
  });
};

export const useGetOneDoctor = (id: number | null) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => (id !== null ? getOneDoctor(id) : undefined),
    enabled: id !== null,
  });
};

export const useGetDoctorList = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctorsList,
    enabled: true,
  });
};
