import useGetSpecialtiesQuery from '@features/doctor/query/useSpecialtyQuery';
import useNotificationStore from '@stores/useNotificationStore';
import { useEffect } from 'react';

import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';
import type { IBasicIdNameDescription } from 'src/types/common.types';

function useFilter(specialty_id: number | null) {
  const storeNotification = useNotificationStore();

  const { data, isError, isLoading } = useGetSpecialtiesQuery();

  const getSpecialtyOptions = (
    values: IBasicIdNameDescription[],
  ): IAutocompleteOption[] => {
    if (Array.isArray(values)) {
      return values.map((value) => ({
        label: value.name,
        id: value.id.toString(),
      }));
    }
    return [];
  };

  const getSelectedSpecialty = (): IAutocompleteOption | null => {
    const selectedId = specialty_id;
    if (!selectedId) return null;

    const specialty =
      data && data.data
        ? data.data.find((s) => s.id.toString() === selectedId.toString())
        : null;
    return specialty
      ? { label: specialty.name, id: specialty.id.toString() }
      : null;
  };

  useEffect(() => {
    if (isError) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al cargar los datos',
      });
    }
  }, [isError, storeNotification]);

  return {
    isLoading,
    specialties: data && data.data ? data.data : [],
    getSpecialtyOptions,
    getSelectedSpecialty,
  };
}

export default useFilter;
