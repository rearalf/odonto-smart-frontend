import useGetSpecialtiesQuery from '@features/doctor/query/useSpecialtyQuery';
import useNotificationStore from '@stores/useNotificationStore';
import { useEffect } from 'react';

import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { IComponentFormProps } from '../types/newDoctor.types';

function useProfessionalInformationSection({
  formikProps,
}: IComponentFormProps) {
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

  const getSelectedSpecialty = (): IAutocompleteOption | null => {
    const selectedId = formikProps.values.specialty_id;
    if (!selectedId) return null;

    const specialty =
      dataSpecialties && dataSpecialties.data
        ? dataSpecialties.data.find(
            (s) => s.id.toString() === selectedId.toString(),
          )
        : null;
    return specialty
      ? { label: specialty.name, id: specialty.id.toString() }
      : null;
  };

  const selectedSpecialties =
    dataSpecialties && dataSpecialties.data
      ? dataSpecialties.data.filter((specialty: IBasicIdNameDescription) =>
          formikProps.values.specialty_ids?.includes(specialty.id),
        )
      : [];

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
    selectedSpecialties,
    getSpecialtyOptions,
    getSelectedSpecialty,
    convertToAutocompleteOptions,
  };
}

export default useProfessionalInformationSection;
