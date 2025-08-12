import { alpha, type SxProps } from '@mui/material';
import type { Theme } from '@emotion/react';

export const headerStyles: SxProps<Theme> = {
  mt: 2,
  mb: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: {
    xs: 'column',
    sm: 'row',
  },
  gap: {
    xs: 2,
    sm: 0,
  },
  textAlign: {
    xs: 'center',
    sm: 'inherit',
  },
};

export const btnGroupStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  mt: '2rem',
};

export const paperStylesBase = (
  backgroundColor: string,
  borderColor: string,
): SxProps<Theme> => ({
  p: 3,
  mb: 3,
  backgroundColor: alpha(backgroundColor, 0.04),
  border: `1px solid ${alpha(borderColor, 0.2)}`,
  borderRadius: 2,
});
