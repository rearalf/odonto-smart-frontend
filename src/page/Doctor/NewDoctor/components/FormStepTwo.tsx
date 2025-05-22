import { Box } from '@mui/material';

import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { INewDoctorFormValues } from '../types/newDoctor.types';
import type { FormikProps } from 'formik';

import { RadioButtonComponent, TransferListComponent } from '@components/index';
import { CONTACT_TYPE } from '../constants/newDoctor';

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
      <RadioButtonComponent
        row
        id="contact_type"
        label="Tipo de contacto"
        options={CONTACT_TYPE}
      />
    </Box>
  );
};

export default FormStepTwo;
