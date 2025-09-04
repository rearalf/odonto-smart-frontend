import { Box, Button } from '@mui/material';
import type { FACE_TYPE, IToothObject } from '@type/teeth.type';
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
      <Button
        variant="text"
        aria-label="Tooth Number Button"
        sx={teethStyles.teethNumberButton(general_state)}
        onClick={() => handleToothInvolvement(toothData, 'oclusal')}
      >
        {tooth_number}
      </Button>
      <Button
        variant="outlined"
        aria-label="Vestibular"
        onClick={() => handleToothInvolvement(toothData, 'vestibular')}
        sx={teethStyles.vestibularTeeth(vestibular)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Mesial"
        onClick={() => handleToothInvolvement(toothData, 'mesial')}
        sx={teethStyles.mesialTeeth(mesial)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Distal"
        onClick={() => handleToothInvolvement(toothData, 'distal')}
        sx={teethStyles.distalTeeth(distal)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Palatina"
        onClick={() => handleToothInvolvement(toothData, 'palatina')}
        sx={teethStyles.palatinaTeeth(palatina)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Oclusal"
        onClick={() => handleToothInvolvement(toothData, 'oclusal')}
        sx={teethStyles.oclusalTeeth(oclusal)}
      ></Button>
    </Box>
  );
};

export default Tooth;
