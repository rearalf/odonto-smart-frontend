import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';

import type { IGetPaginationOptions } from 'src/types/apiResponse.types';
import { roleService } from '@api/services';

const useGetListAllRoles = (options: IGetPaginationOptions = {}) => {
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

export default useGetListAllRoles;
