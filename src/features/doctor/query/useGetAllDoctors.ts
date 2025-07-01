import { useQuery } from '@tanstack/react-query';

import type { IGetPaginationOptions } from 'src/types/apiResponse.types';
import { doctorService } from '@api/services';
import { useDeferredValue } from 'react';

const useGetAllDoctorsQuery = (options: IGetPaginationOptions = {}) => {
  const deferredSearch = useDeferredValue(options.search);
  const deferredSpecialtyId = useDeferredValue(options.specialtyId);

  const queryOptions: IGetPaginationOptions = {
    ...options,
    search: deferredSearch,
    specialtyId: deferredSpecialtyId,
  };

  return useQuery({
    queryKey: ['doctors', queryOptions],
    queryFn: () => doctorService.getAllDoctors(queryOptions),
    enabled: true,
  });
};

export default useGetAllDoctorsQuery;
