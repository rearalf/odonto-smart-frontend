import { Grid } from '@mui/material';
import { memo } from 'react';

import type { FACE_TYPE, IToothObject } from '../types/teeth.type';
import { newInstantAppointmentStyles } from '../styles/styles';
import OdontogramQuadrant from './OdontogramQuadrant';

interface IOdontogramRowProps {
  leftTeeth: IToothObject[];
  rightTeeth: IToothObject[];
  handleToothClick: (tooth: IToothObject, face?: FACE_TYPE) => void;
}

const OdontogramRow = ({
  leftTeeth,
  rightTeeth,
  handleToothClick,
}: IOdontogramRowProps) => {
  return (
    <Grid sx={newInstantAppointmentStyles.rowContainer}>
      <OdontogramQuadrant
        teeth={leftTeeth}
        handleToothClick={handleToothClick}
      />
      <OdontogramQuadrant
        teeth={rightTeeth}
        handleToothClick={handleToothClick}
      />
    </Grid>
  );
};

export default memo(
  OdontogramRow,
  (prev, next) =>
    prev.leftTeeth === next.leftTeeth &&
    prev.rightTeeth === next.rightTeeth &&
    prev.handleToothClick === next.handleToothClick,
);
