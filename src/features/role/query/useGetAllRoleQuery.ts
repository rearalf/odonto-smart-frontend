import { roleService } from '@api/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllRoleQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getAllRole(),
    enabled,
  });
};

export default useGetAllRoleQuery;
