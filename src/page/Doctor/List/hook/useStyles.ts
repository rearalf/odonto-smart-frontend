import type { Theme } from '@emotion/react';
import { alpha, useTheme, type SxProps } from '@mui/material';
import type { CSSProperties } from 'react';

function useStyles() {
  const theme = useTheme();

  const alphafunction = (color: string, opacity: number) =>
    alpha(color, opacity);

  const headerStyles: SxProps<Theme> = {
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

  const headerIconStyles: CSSProperties = {
    transition: 'transform 0.2s ease-in-out',
  };

  return {
    theme,
    headerStyles,
    alphafunction,
    headerIconStyles,
  };
}

export default useStyles;
