import { roleService } from '@api/services';
import { useMutation } from '@tanstack/react-query';
import type { ICreateRole } from 'src/types/role.type';

const useUpdateRole = () => {
  return useMutation({
    mutationFn: async ({ id, params }: { id: number; params: ICreateRole }) =>
      roleService.updateRole(id, params),
  });
};

export default useUpdateRole;
