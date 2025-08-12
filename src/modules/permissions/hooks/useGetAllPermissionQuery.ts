import { useQuery } from '@tanstack/react-query';
import { getAllPermission } from '../services/permission.service';

const useGetAllPermission = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => getAllPermission(),
    enabled,
  });
};

export default useGetAllPermission;
