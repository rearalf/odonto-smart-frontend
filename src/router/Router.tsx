import { createBrowserRouter } from 'react-router';

import Dashboard from '@pages/dashboard';
import SignIn from '@pages/auth/SignIn';
import Private from '@layouts/Private';
import Users from '@pages/Users/List';
import Public from '@layouts/Public';
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
        path: 'user',
        element: <Private />,
        children: [
          {
            path: '',
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

export default router;
