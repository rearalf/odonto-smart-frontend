import { useQuery } from '@tanstack/react-query';
import { getAllSpecialty } from '../services/specialty';

const useGetSpecialtiesQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['specialties'],
    queryFn: () => getAllSpecialty(),
    enabled,
  });
};

export default useGetSpecialtiesQuery;
