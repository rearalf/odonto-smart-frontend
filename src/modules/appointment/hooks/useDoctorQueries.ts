import { useQuery } from '@tanstack/react-query';
import { getDoctorsList } from '../services/doctor.service';

export const useGetDoctorList = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctorsList,
    enabled: true,
  });
};
