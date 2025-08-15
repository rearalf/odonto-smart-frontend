import { Outlet } from 'react-router';

import Providers from '@modules/shared/providers/Providers';
import GlobalUI from '@components/GlobalUI';

function App() {
  return (
    <Providers>
      <GlobalUI />
      <Outlet />
    </Providers>
  );
}

export default App;
