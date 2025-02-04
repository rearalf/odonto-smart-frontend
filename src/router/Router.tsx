import { createBrowserRouter } from 'react-router';

import SignIn from '../page/auth/SignIn';

import Dashboard from '../page/dashboard';
import Private from '../Layouts/Private';
import Public from '../Layouts/public';
import Users from '../page/Users/List';
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
