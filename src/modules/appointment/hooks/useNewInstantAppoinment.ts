import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { IAppointmentInstant } from '../types/index.types';
import type { FormikHelpers } from 'formik';

import useOdontogramStore from '@stores/useOdontogramStore';
import useLoadingStore from '@stores/useLoadingStore';

import { useGetOdontogramByPatientId } from '@modules/odontogram/hook/useOdontogramQueries';
import { useGetPatientByIdQuery } from '@modules/patients/hooks/usePatientQueries';
import { useGetDoctorList } from '@modules/doctors/hooks/useDoctorsQueries';

import { combineTeethData } from '@modules/odontogram/utils/combineTeethData';
import { CONSTANTTEETHLIST } from '@modules/shared/constans/teeth';

function useNewInstantAppoinment() {
  const { patientId } = useParams();

  const { setLoading } = useLoadingStore();
  const { setOdontogramData } = useOdontogramStore();

  const { data: doctorData, isLoading: doctorIsLoading } = useGetDoctorList();
  const { data: patientData, isLoading: patientIsLoading } =
    useGetPatientByIdQuery(patientId || '');
  const {
    data: odontogramData,
    isLoading: odontogramIsLoading,
    error: odontogramError,
  } = useGetOdontogramByPatientId(Number(patientId));

  const [patientDialog, setPatientDialog] = useState<boolean>(false);

  const handleOpenPatientDialog = () => {
    setPatientDialog(!patientDialog);
  };

  const handleSave = (
    _values: IAppointmentInstant,
    _formikHelpers: FormikHelpers<IAppointmentInstant>,
  ) => {
    // const modifiedTeeth = getModifiedTeeth();
  };

  useEffect(() => {
    setLoading(patientIsLoading);
  }, [patientIsLoading, setLoading]);

  useEffect(() => {
    setLoading(doctorIsLoading);
  }, [doctorIsLoading, setLoading]);

  useEffect(() => {
    setLoading(odontogramIsLoading);
  }, [odontogramIsLoading, setLoading]);

  useEffect(() => {
    const updatedData = combineTeethData(
      CONSTANTTEETHLIST,
      odontogramData && odontogramData.data ? odontogramData.data.tooth : [],
    );
    setOdontogramData(updatedData);
  }, [odontogramData, setOdontogramData]);

  return {
    patientId,
    patientDialog,
    doctorIsLoading,
    odontogramError,
    patientIsLoading,
    odontogramIsLoading,
    odontogramData: odontogramData || [],
    patientData: patientData && patientData.data ? patientData.data : null,
    doctorsList: doctorData && doctorData.data ? doctorData.data : [],
    handleSave,
    handleOpenPatientDialog,
  };
}

export default useNewInstantAppoinment;
