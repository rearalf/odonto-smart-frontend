import useGetSpecialtiesQuery from '@features/doctor/query/useSpecialtyQuery';
import useNotificationStore from '@stores/useNotificationStore';
import { useEffect } from 'react';

import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';
import type { IBasicIdNameDescription } from 'src/types/common.types';

function useProfessionalInformationSection() {
  const {
    data: dataSpecialties,
    isError: isErrorSpecialty,
    isLoading: isLoadingSpecialty,
  } = useGetSpecialtiesQuery();

  const storeNotification = useNotificationStore();

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

  const convertToAutocompleteOptions = (
    items: IBasicIdNameDescription[],
  ): IAutocompleteOption[] =>
    items.map((item) => ({
      id: item.id,
      label: item.name,
      name: item.name,
      description: item.description,
    }));

  useEffect(() => {
    if (isErrorSpecialty) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al obtener las especialidades',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorSpecialty]);

  return {
    specialties:
      dataSpecialties && dataSpecialties.data ? dataSpecialties.data : [],
    isLoadingSpecialty,
    getSpecialtyOptions,
    convertToAutocompleteOptions,
  };
}

export default useProfessionalInformationSection;
