import { FiSave, FiXCircle } from 'react-icons/fi';
import { Box } from '@mui/material';

import ButtonComponent from './ButtonComponent';
import { btnGroupStyles } from '@styles/index';
import { useFormikContext } from 'formik';

const ButtonsGroupForm = () => {
  const { isSubmitting, isValid, dirty } = useFormikContext();
  return (
    <Box component="div" sx={btnGroupStyles}>
      <ButtonComponent
        color="error"
        text="Cancelar"
        position="left"
        variant="outlined"
        icon={<FiXCircle />}
        loading={isSubmitting}
      />
      <ButtonComponent
        type="submit"
        text="Guardar"
        color="success"
        position="left"
        icon={<FiSave />}
        variant="contained"
        loading={isSubmitting}
        disabled={!isValid || !dirty || isSubmitting}
      />
    </Box>
  );
};

export default ButtonsGroupForm;
