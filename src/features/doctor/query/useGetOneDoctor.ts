import { doctorService } from '@api/services';
import { useQuery } from '@tanstack/react-query';

const useGetOneDoctor = (id: number | null) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => (id !== null ? doctorService.getOneDoctor(id) : undefined),
    enabled: id !== null,
  });
};

export default useGetOneDoctor;
