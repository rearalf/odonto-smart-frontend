import { ThemeProvider } from '@emotion/react';
import { THEME_ID } from '@mui/material';
import { Outlet } from 'react-router';

import { ExpiredSession, LoadingProgress, Notification } from './components';
import themeLight from './Theme';

function App() {
  return (
    <>
      <ThemeProvider theme={{ [THEME_ID]: themeLight }}>
        <ExpiredSession />
        <LoadingProgress />
        <Notification />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
