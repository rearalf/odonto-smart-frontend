import { FormikProps } from 'formik';
import { useState } from 'react';

import {
  doctorSchemaStepOne,
  doctorSchemaStepTwo,
} from './validation/newDoctor.schema';
import { INewDoctorFormValues } from './types/newDoctor.types';
import { exampleToSpecialties } from './constants/newDoctor';

function useNewDoctor() {
  const [activeStep, setActiveStep] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skipped, _setSkipped] = useState(new Set<number>());

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [specialties, _setSpecialties] =
    useState<IBasicIdNameDescription[]>(exampleToSpecialties);

  const [specialtiesBySelect, setSpecialtiesBySelect] = useState<
    (number | string)[]
  >([1, 2, 3]);

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

  const handlePrevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleNextStep = async (formik: FormikProps<INewDoctorFormValues>) => {
    const isValid = await formik.validateForm();
    if (Object.keys(isValid).length === 0) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleSetSpecialtiesBySelect = (newSet: (number | string)[]) =>
    setSpecialtiesBySelect(newSet);

  return {
    activeStep,
    specialties,
    isShowPassword,
    specialtiesBySelect,
    isShowConfirmPassword,
    getValidationSchema,
    isStepSkipped,
    handlePrevStep,
    handleNextStep,
    handleShowPassword,
    handleShowConfirmPassword,
    handleSetSpecialtiesBySelect,
  };
}

export default useNewDoctor;
