import { alpha, useTheme } from '@mui/material';

function useStyles() {
  const theme = useTheme();

  const alphafunction = (color: string, opacity: number) =>
    alpha(color, opacity);

  const paperStyles = {
    p: 3,
    mb: 3,
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: 2,
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
    alphafunction,
    cardRolsStyles,
    boxContactCardStyles,
    boxContactFormStyles,
    cardPermissionsStyles,
    cardCredencialesStyles,
  };
}

export default useStyles;
