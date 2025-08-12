import { useMutation, useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';

import { roleService } from '@api/services';

import type { IGetPaginationOptions } from 'src/modules/shared/types/apiResponse.types';
import type { ICreateRole } from '@type/role.type';

export const useGetAllRoleQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getAllRole(),
    enabled,
  });
};

export const useGetListAllRoles = (options: IGetPaginationOptions = {}) => {
  const deferredSearch = useDeferredValue(options.search);

  const queryOptions: IGetPaginationOptions = {
    ...options,
    search: deferredSearch,
  };

  return useQuery({
    queryKey: ['roles', queryOptions],
    queryFn: () => roleService.listAllRole(queryOptions),
    enabled: true,
  });
};

export const useGetOneRoleQuery = (id?: number) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => (id ? roleService.getOneRolebyId(id) : null),
    enabled: !!id,
  });
};

export const useCreateRoleQuery = () => {
  return useMutation({
    mutationFn: async (role: ICreateRole) => roleService.createRole(role),
  });
};

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: async ({ id, params }: { id: number; params: ICreateRole }) =>
      roleService.updateRole(id, params),
  });
};
