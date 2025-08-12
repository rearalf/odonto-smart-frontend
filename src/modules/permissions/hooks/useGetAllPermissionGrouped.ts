import { useQuery } from '@tanstack/react-query';
import { getAllPermissionGrouped } from '../services/permission.service';

const useGetAllPermissionGrouped = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => getAllPermissionGrouped(),
    enabled,
  });
};

export default useGetAllPermissionGrouped;
