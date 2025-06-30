import { useQuery } from '@tanstack/react-query';

import type { IGetPaginationOptions } from 'src/types/apiResponse.types';
import { doctorService } from '@api/services';

const useGetAllDoctorsQuery = (options: IGetPaginationOptions = {}) => {
  return useQuery({
    queryKey: ['doctors', options],
    queryFn: () => doctorService.getAllDoctors(options),
    enabled: true,
  });
};

export default useGetAllDoctorsQuery;
