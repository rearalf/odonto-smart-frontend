import { Box } from '@mui/material';

import type { INewDoctorFormValues } from '../types/newDoctor.types';
import type { IBasicIdNameDescription } from 'src/types/common';
import type { FormikProps } from 'formik';

import { TransferListComponent } from '@components/index';

interface IFormStepTwoProps {
  specialties: IBasicIdNameDescription[];
  formikProps: FormikProps<INewDoctorFormValues>;
  isLoadingSpecialty: boolean;
  specialtiesBySelect: (number | string)[];
  handleSetSpecialtiesBySelect: (newSet: (number | string)[]) => void;
}

const FormStepTwo = (props: IFormStepTwoProps) => {
  return (
    <Box component="div" className="form-step-2">
      <Box component="div" className="first-part">
        <TransferListComponent
          items={props.specialties}
          leftIds={props.specialtiesBySelect}
          isLoading={props.isLoadingSpecialty}
          rightIds={props.formikProps.values.specialties}
          onChange={(newLeftIds, newRightIds) => {
            props.handleSetSpecialtiesBySelect(newLeftIds);
            props.formikProps.setFieldValue('specialties', newRightIds);
          }}
        />
      </Box>
    </Box>
  );
};

export default FormStepTwo;
