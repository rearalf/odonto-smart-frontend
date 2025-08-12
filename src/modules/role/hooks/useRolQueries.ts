import { useMutation, useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';

import type { IGetPaginationOptions } from 'src/modules/shared/types/apiResponse.types';
import type { ICreateRole } from '@type/role.type';
import {
  createRole,
  getAllRole,
  updateRole,
  listAllRole,
  getOneRolebyId,
} from '../services/role.service';

export const useGetAllRoleQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => getAllRole(),
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
    queryFn: () => listAllRole(queryOptions),
    enabled: true,
  });
};

export const useGetOneRoleQuery = (id?: number) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => (id ? getOneRolebyId(id) : null),
    enabled: !!id,
  });
};

export const useCreateRoleQuery = () => {
  return useMutation({
    mutationFn: async (role: ICreateRole) => createRole(role),
  });
};

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: async ({ id, params }: { id: number; params: ICreateRole }) =>
      updateRole(id, params),
  });
};
