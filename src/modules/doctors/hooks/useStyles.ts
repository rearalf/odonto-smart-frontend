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

  const cardCredencialesStyles = {
    backgroundColor: alpha(theme.palette.info.main, 0.04),
    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
    borderRadius: 2,
    mb: 3,
  };

  const cardRolsStyles = {
    backgroundColor: alpha(theme.palette.warning.main, 0.04),
    border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
    borderRadius: 2,
    height: '100%',
  };

  const cardPermissionsStyles = {
    backgroundColor: alpha(theme.palette.error.main, 0.04),
    border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
    borderRadius: 2,
    height: '100%',
  };

  const boxContactFormStyles = {
    p: 2.5,
    backgroundColor: alpha(theme.palette.success.main, 0.04),
    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
    borderRadius: 2,
  };

  const boxContactCardStyles = {
    p: 2,
    borderRadius: 1.5,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    position: 'relative',
    transition: 'all 0.2s ease',
  };

  return {
    theme,
    paperStyles,
    headerStyles,
    alphafunction,
    headerIconStyles,
    cardRolsStyles,
    boxContactCardStyles,
    boxContactFormStyles,
    cardPermissionsStyles,
    cardCredencialesStyles,
  };
}

export default useStyles;
