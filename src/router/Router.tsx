import { createBrowserRouter } from 'react-router';

import Dashboard from '@pages/Dashboard';
import SignIn from '@pages/auth/SignIn';
import Private from '@layouts/Private';
import Public from '@layouts/public';
import Doctor from '@pages/Doctor';
import App from '../App';

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
      {
        path: 'doctor',
        element: <Private />,
        children: [
          {
            path: '',
            element: <Doctor />,
          },
        ],
      },
    ],
  },
]);

export default router;
