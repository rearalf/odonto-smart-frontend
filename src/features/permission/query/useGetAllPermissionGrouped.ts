import { permissionService } from '@api/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllPermissionGrouped = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => permissionService.getAllPermissionGrouped(),
    enabled,
  });
};

export default useGetAllPermissionGrouped;
