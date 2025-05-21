import { specialtyService } from '@api/services';
import { useQuery } from '@tanstack/react-query';

const useGetSpecialtiesQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['specialties'],
    queryFn: specialtyService.getAllSpecialty,
    enabled,
  });
};

export default useGetSpecialtiesQuery;
