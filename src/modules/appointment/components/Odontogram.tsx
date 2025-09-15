import { Grid } from '@mui/material';
import { memo } from 'react';

import type { FACE_TYPE, ITeethList, IToothObject } from '../types/teeth.type';
import { newInstantAppointmentStyles } from '../styles/styles';
import OdontogramRow from './OdontogramRow';

interface IOdontogramProps {
  odontogramData: ITeethList;
  handleToothClick: (tooth: IToothObject, face?: FACE_TYPE) => void;
}

const Odontogram = ({ odontogramData, handleToothClick }: IOdontogramProps) => {
  return (
    <Grid container spacing={3} sx={newInstantAppointmentStyles.teethContainer}>
      <OdontogramRow
        leftTeeth={odontogramData.permanent['1']}
        rightTeeth={odontogramData.permanent['2']}
        handleToothClick={handleToothClick}
      />

      <OdontogramRow
        leftTeeth={odontogramData.temporary['5']}
        rightTeeth={odontogramData.temporary['6']}
        handleToothClick={handleToothClick}
      />

      <OdontogramRow
        leftTeeth={odontogramData.temporary['8']}
        rightTeeth={odontogramData.temporary['7']}
        handleToothClick={handleToothClick}
      />

      <OdontogramRow
        leftTeeth={odontogramData.permanent['3']}
        rightTeeth={odontogramData.permanent['4']}
        handleToothClick={handleToothClick}
      />
    </Grid>
  );
};

export default memo(Odontogram);
