import { FormikProps } from 'formik';
import { Box } from '@mui/material';

import { INewDoctorFormValues } from '../types/newDoctor.types';
import { TransferListComponent } from '@components/index';

interface IFormStepTwoProps {
  specialties: IBasicIdNameDescription[];
  formikProps: FormikProps<INewDoctorFormValues>;
  specialtiesBySelect: (number | string)[];
  handleSetSpecialtiesBySelect: (newSet: (number | string)[]) => void;
}

const FormStepTwo = (props: IFormStepTwoProps) => {
  return (
    <Box component="div" className="form-step-2">
      <TransferListComponent
        items={props.specialties}
        leftIds={props.specialtiesBySelect}
        rightIds={props.formikProps.values.specialties}
        onChange={(newLeftIds, newRightIds) => {
          props.handleSetSpecialtiesBySelect(newLeftIds);
          props.formikProps.setFieldValue('specialties', newRightIds);
        }}
      />
    </Box>
  );
};

export default FormStepTwo;
