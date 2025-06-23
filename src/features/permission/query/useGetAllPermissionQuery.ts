import { permissionService } from '@api/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllPermission = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => permissionService.getAllPermission(),
    enabled,
  });
};

export default useGetAllPermission;
