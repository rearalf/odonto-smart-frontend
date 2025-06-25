import type { Theme } from '@emotion/react';
import type { SxProps } from '@mui/material';
import type { CSSProperties } from 'react';

function useStyles() {
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
    headerStyles,
    headerIconStyles,
  };
}

export default useStyles;
