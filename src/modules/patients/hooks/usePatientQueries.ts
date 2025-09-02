import { useMutation } from '@tanstack/react-query';
import { createPatient } from '../services/patient.service';

export const useCreatePatient = () => {
  return useMutation({
    mutationFn: async (patientData: FormData) => createPatient(patientData),
  });
};
