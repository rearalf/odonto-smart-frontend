import { useEffect, useState } from 'react';

import type { INewDoctorFormValues } from './types/newDoctor.types';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { FormikProps } from 'formik';
import type { MouseEvent } from 'react';

import {
  doctorSchemaStepOne,
  doctorSchemaStepTwo,
} from './validation/newDoctor.schema';

import useGetSpecialtiesQuery from '@features/doctor/query/useSpecialtyQuery';
import useNotificationStore from '@stores/useNotificationStore';
import useLoadingStore from '@stores/useLoadingStore';

function useNewDoctor() {
  const {
    isError,
    data: dataSpecialties,
    isLoading: isLoadingSpecialty,
  } = useGetSpecialtiesQuery();

  const { handleLoading } = useLoadingStore();
  const storeNotification = useNotificationStore();

  const [activeStep, setActiveStep] = useState(1);
  const [skipped, setSkipped] = useState(new Set<number>());

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const [specialties, setSpecialties] = useState<IBasicIdNameDescription[]>([]);

  const [specialtiesBySelect, setSpecialtiesBySelect] = useState<
    (number | string)[]
  >([]);

  const isStepOptional = (step: number) => step === 1;

  function getValidationSchema(step: number) {
    switch (step) {
      case 0:
        return doctorSchemaStepOne;
      case 1:
        return doctorSchemaStepTwo;
    }
  }

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);
  const handleShowConfirmPassword = () =>
    setIsShowConfirmPassword(!isShowConfirmPassword);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep))
      throw new Error('No puedes saltar un paso que no es opcional.');

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handlePrevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleNextStep = async (
    formik: FormikProps<INewDoctorFormValues>,
    e: MouseEvent,
  ) => {
    e.preventDefault();

    const isValid = await formik.validateForm();
    const errors = await formik.validateForm();

    if (Object.keys(isValid).length === 0 && Object.keys(errors).length === 0) {
      setActiveStep((prev) => prev + 1);
    } else {
      if (activeStep === 0) {
        formik.setFieldTouched('first_name', true);
        formik.setFieldTouched('middle_name', true);
        formik.setFieldTouched('last_name', true);
        formik.setFieldTouched('email', true);
        formik.setFieldTouched('password', true);
        formik.setFieldTouched('confirmPassword', true);
        formik.setFieldTouched('specialty', true);
        formik.setFieldTouched('qualification', true);
      }
    }
  };

  const handleSetSpecialtiesBySelect = (newSet: (number | string)[]) =>
    setSpecialtiesBySelect(newSet);

  const sortSpecialtiesInForm = () => {
    if (dataSpecialties) {
      setSpecialties(dataSpecialties);

      const ids = dataSpecialties.map((data) => data.id);
      setSpecialtiesBySelect(ids);
    }
  };

  useEffect(() => {
    sortSpecialtiesInForm();
    handleLoading(isLoadingSpecialty);

    if (isError) {
      storeNotification.handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error en el servidor',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingSpecialty]);

  return {
    activeStep,
    specialties,
    isStepOptional,
    isShowPassword,
    isLoadingSpecialty,
    specialtiesBySelect,
    isShowConfirmPassword,
    getValidationSchema,
    handleSkip,
    isStepSkipped,
    handlePrevStep,
    handleNextStep,
    handleShowPassword,
    handleShowConfirmPassword,
    handleSetSpecialtiesBySelect,
  };
}

export default useNewDoctor;
