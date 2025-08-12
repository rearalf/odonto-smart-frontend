import type { Theme } from '@emotion/react';
import type { SxProps } from '@mui/material';

export const buttonStylesSX: SxProps<Theme> = {
  width: { xs: '100%', sm: 'auto' },
  borderRadius: 2,
  fontWeight: 600,
  fontSize: '0.95rem',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    '& .button-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  '&:active': {
    transform: 'translateY(0px)',
    transition: 'transform 0.1s',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
    transform: 'scale(0)',
    transition: 'transform 0.5s',
    zIndex: 0,
  },
};
