import { useQuery } from '@tanstack/react-query';

import { getGeneralOdontogramByPatientId } from '../services/odontogram.service';

export const useGetOdontogramByPatientId = (patientId: number) => {
  return useQuery({
    queryKey: ['odontogram', patientId],
    queryFn: () => getGeneralOdontogramByPatientId(patientId),
    enabled: !!patientId,
  });
};
