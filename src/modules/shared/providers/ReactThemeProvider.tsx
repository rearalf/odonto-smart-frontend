import { ThemeProvider } from '@emotion/react';
import { THEME_ID } from '@mui/material';
import type { ReactNode } from 'react';
import themeLight from '../Theme';

interface IReactThemeProvider {
  children: ReactNode;
}

function ReactThemeProvider({ children }: IReactThemeProvider) {
  return (
    <ThemeProvider theme={{ [THEME_ID]: themeLight }}>{children}</ThemeProvider>
  );
}

export default ReactThemeProvider;
