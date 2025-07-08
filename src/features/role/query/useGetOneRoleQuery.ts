import { roleService } from '@api/services';
import { useQuery } from '@tanstack/react-query';

const useGetOneRoleQuery = (id?: number) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => (id ? roleService.getOneRolebyId(id) : null),
    enabled: !!id,
  });
};

export default useGetOneRoleQuery;
