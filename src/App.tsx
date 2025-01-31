import { ThemeProvider } from '@emotion/react';
import { THEME_ID } from '@mui/material';
import { Outlet } from 'react-router';

import LoadingProgress from './components/LoadingProgress';
import themeLight from './Theme';

function App() {
  return (
    <>
      <ThemeProvider theme={{ [THEME_ID]: themeLight }}>
        <LoadingProgress />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
