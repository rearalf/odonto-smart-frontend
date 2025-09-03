import { useMutation, useQuery } from '@tanstack/react-query';
import { createPatient, findAllPatients } from '../services/patient.service';
import type { IPagination } from '@type/apiResponse.types';
import { useDeferredValue } from 'react';

export const useCreatePatient = () => {
  return useMutation({
    mutationFn: async (patientData: FormData) => createPatient(patientData),
  });
};

export const useGetAllPatientsQuery = (
  options: IPagination & { search: string },
) => {
  const deferredSearch = useDeferredValue(options.search);

  const queryOptions: IPagination & { search: string } = {
    ...options,
    search: deferredSearch,
  };

  return useQuery({
    enabled: true,
    queryKey: ['patients', queryOptions],
    queryFn: async () => findAllPatients(queryOptions),
  });
};
