import { createBrowserRouter } from 'react-router';

import SignIn from '../page/auth/SignIn';
import Public from '../Layouts/Public';
import App from '../App';
import Private from '../Layouts/Private';
import Dashboard from '../page/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'auth',
        element: <Public />,
        children: [
          {
            path: '',
            element: <SignIn />,
          },
        ],
      },
      {
        path: '',
        element: <Private />,
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
