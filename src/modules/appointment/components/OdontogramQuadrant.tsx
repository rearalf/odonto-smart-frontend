import { Grid } from '@mui/material';
import { memo } from 'react';

import type { FACE_TYPE, IToothObject } from '../types/teeth.type';
import { newInstantAppointmentStyles } from '../styles/styles';
import Tooth from './Tooth';

interface IOdontogramQuadrantProps {
  teeth: IToothObject[];
  handleToothClick: (tooth: IToothObject, face?: FACE_TYPE) => void;
}

const OdontogramQuadrant = ({
  teeth,
  handleToothClick,
}: IOdontogramQuadrantProps) => {
  return (
    <Grid sx={newInstantAppointmentStyles.roowToothContainer}>
      {teeth.map((tooth) => (
        <Tooth
          key={tooth.tooth_number}
          toothData={tooth}
          handleToothInvolvement={handleToothClick}
        />
      ))}
    </Grid>
  );
};

export default memo(
  OdontogramQuadrant,
  (prev, next) =>
    prev.teeth === next.teeth &&
    prev.handleToothClick === next.handleToothClick,
);
