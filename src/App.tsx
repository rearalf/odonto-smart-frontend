import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { THEME_ID } from '@mui/material';
import { Outlet } from 'react-router';

import queryClient from '@features/queryClient';
import themeLight from './Theme';
import {
  Notification,
  ExpiredSession,
  LoadingProgress,
} from '@components/index';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={{ [THEME_ID]: themeLight }}>
          <ExpiredSession />
          <LoadingProgress />
          <Notification />
          <Outlet />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
