import { alpha } from '@mui/material';

const alphaStyles = (color: string, opacity: number): string =>
  alpha(color, opacity);

export default alphaStyles;
