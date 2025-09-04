import type { SxProps, Theme } from '@mui/material';
import { TOOTH_FACE_AFFECTION, type TOOTH_STATE } from '@type/teeth.type';
import { getFaceColor, getStateColor } from '@utils/handleTeethStateColor';

type TeethStyles = {
  container: SxProps<Theme>;
  teethNumberButton: (general_state: TOOTH_STATE) => SxProps<Theme>;
  vestibularTeeth: (state: TOOTH_FACE_AFFECTION) => SxProps<Theme>;
  mesialTeeth: (state: TOOTH_FACE_AFFECTION) => SxProps<Theme>;
  distalTeeth: (state: TOOTH_FACE_AFFECTION) => SxProps<Theme>;
  oclusalTeeth: (state: TOOTH_FACE_AFFECTION) => SxProps<Theme>;
  palatinaTeeth: (state: TOOTH_FACE_AFFECTION) => SxProps<Theme>;
};

type NewInstantAppointmentStyles = {
  rowContainer: SxProps<Theme>;
  teethContainer: SxProps<Theme>;
  roowToothContainer: SxProps<Theme>;
};

export const teethStyles: TeethStyles = {
  container: {
    position: 'relative',
    width: {
      xs: 35,
      sm: 45,
      md: 55,
      lg: 65,
    },
    height: {
      xs: 35,
      sm: 45,
      md: 55,
      lg: 65,
    },
  },
  teethNumberButton: (general_state) => () => ({
    zIndex: 1,
    top: '50%',
    left: '50%',
    minWidth: 0,
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    transition: 'font-size .5s ease-in-out',
    width: { xs: '9px', sm: '11px', md: '14px', lg: '27px' },
    height: { xs: '9px', sm: '11px', md: '14px', lg: '27px' },
    fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
    backgroundColor: getStateColor(general_state),
  }),

  vestibularTeeth: (vestibular) => () => ({
    position: 'absolute',
    bottom: 0,
    left: '15%',
    padding: 0,
    minWidth: 0,
    borderTopLeftRadius: '60%',
    borderTopRightRadius: '60%',
    width: '70%',
    height: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '18px',
    },
    backgroundColor: getFaceColor(vestibular),
    borderColor:
      vestibular !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(vestibular)
        : undefined,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  }),

  mesialTeeth: (mesial) => () => ({
    position: 'absolute',
    left: 0,
    top: '20%',
    padding: 0,
    maxWidth: 0,
    height: '60%',
    borderTopRightRadius: '60%',
    borderBottomRightRadius: '60%',
    minWidth: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '18px',
    },
    backgroundColor: getFaceColor(mesial),
    borderColor:
      mesial !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(mesial)
        : undefined,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  }),

  distalTeeth: (distal) => () => ({
    right: 0,
    top: '20%',
    padding: 0,
    minWidth: 0,
    height: '60%',
    position: 'absolute',
    borderTopLeftRadius: '60%',
    borderBottomLeftRadius: '60%',
    width: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '18px',
    },
    backgroundColor: getFaceColor(distal),
    borderColor:
      distal !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(distal)
        : undefined,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  }),

  palatinaTeeth: (palatina) => () => ({
    position: 'absolute',
    top: 0,
    left: '15%',
    padding: 0,
    minWidth: 0,
    borderBottomLeftRadius: '60%',
    borderBottomRightRadius: '60%',
    width: '70%',
    height: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '18px',
    },
    backgroundColor: getFaceColor(palatina),
    borderColor:
      palatina !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(palatina)
        : undefined,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  }),

  oclusalTeeth: (oclusal) => () => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    minWidth: 0,
    width: {
      xs: '15px',
      sm: '20px',
      md: '25px',
      lg: '27px',
    },
    height: {
      xs: '15px',
      sm: '20px',
      md: '25px',
      lg: '27px',
    },
    backgroundColor: getFaceColor(oclusal),
    borderColor:
      oclusal !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(oclusal)
        : undefined,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  }),
};

export const newInstantAppointmentStyles: NewInstantAppointmentStyles = {
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: { lg: 3, xs: 1 },
  },
  teethContainer: { display: 'flex', justifyContent: 'center' },
  roowToothContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: {
      lg: 2,
      xs: 1,
    },
  },
};
