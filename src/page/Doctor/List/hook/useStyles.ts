import type { Theme } from '@emotion/react';
import { alpha, useTheme, type SxProps } from '@mui/material';
import type { CSSProperties } from 'react';

function useStyles() {
  const theme = useTheme();

  const alphafunction = (color: string, opacity: number) =>
    alpha(color, opacity);

  const paperStyles = {
    p: 3,
    mb: 3,
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    borderRadius: 2,
  };

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
    paperStyles,
    headerStyles,
    alphafunction,
    headerIconStyles,
  };
}

export default useStyles;
