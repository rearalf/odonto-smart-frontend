import { Box, Button } from '@mui/material';
import { memo } from 'react';

import {
  TOOTH_STATE,
  type FACE_TYPE,
  type IToothObject,
} from '@modules/odontogram/types/type';
import { teethStyles } from '../styles/styles';

interface IToothProps {
  toothData: IToothObject;
  handleToothInvolvement: (tooth: IToothObject, face?: FACE_TYPE) => void;
}

const Tooth = ({ toothData, handleToothInvolvement }: IToothProps) => {
  const {
    tooth_number,
    general_state,
    vestibular,
    mesial,
    distal,
    palatina,
    oclusal,
  } = toothData;

  return (
    <Box sx={teethStyles.container} key={tooth_number}>
      {(general_state === TOOTH_STATE.EXTRACTION ||
        general_state === TOOTH_STATE.EXTRACTION_DONE ||
        general_state === TOOTH_STATE.MISSING) && (
        <Button
          variant="text"
          aria-label="Tooth Number Button"
          sx={teethStyles.affectedTeeth(general_state)}
          onClick={() => handleToothInvolvement(toothData)}
        >
          {general_state !== TOOTH_STATE.MISSING ? 'X' : ''}
        </Button>
      )}
      <Button
        variant="outlined"
        aria-label="Vestibular"
        onClick={() => handleToothInvolvement(toothData, 'vestibular')}
        sx={teethStyles.vestibularTeeth(vestibular, general_state)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Mesial"
        onClick={() => handleToothInvolvement(toothData, 'mesial')}
        sx={teethStyles.mesialTeeth(mesial, general_state)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Distal"
        onClick={() => handleToothInvolvement(toothData, 'distal')}
        sx={teethStyles.distalTeeth(distal, general_state)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Palatina"
        onClick={() => handleToothInvolvement(toothData, 'palatina')}
        sx={teethStyles.palatinaTeeth(palatina, general_state)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Oclusal"
        onClick={() => handleToothInvolvement(toothData, 'oclusal')}
        sx={teethStyles.oclusalTeeth(oclusal, general_state)}
      >
        {tooth_number}
      </Button>
    </Box>
  );
};

export default memo(Tooth, (prev, next) => {
  return (
    prev.toothData === next.toothData &&
    prev.handleToothInvolvement === next.handleToothInvolvement
  );
});
