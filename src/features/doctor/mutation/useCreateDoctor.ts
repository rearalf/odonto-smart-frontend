import { doctorService } from '@api/services';
import { useMutation } from '@tanstack/react-query';

const useCreateDoctor = () => {
  return useMutation({
    mutationFn: async (doctorData: FormData) =>
      doctorService.createDoctor(doctorData),
  });
};

export default useCreateDoctor;
