import { roleService } from '@api/services';
import { useMutation } from '@tanstack/react-query';
import type { ICreateRole } from 'src/types/role.type';

const useCreateRole = () => {
  return useMutation({
    mutationFn: async (role: ICreateRole) => roleService.createRole(role),
  });
};

export default useCreateRole;
