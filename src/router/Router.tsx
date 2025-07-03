import { createBrowserRouter } from 'react-router';

import { Doctor, NewDoctor } from '@pages/Doctor';
import Dashboard from '@pages/Dashboard';
import SignIn from '@pages/auth/SignIn';
import Private from '@layouts/Private';
import Public from '@layouts/public';
import App from '../App';
import { CreateRole, ListRols } from '@pages/Role';

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
          {
            id: 'doctor',
            path: 'doctor',
            children: [
              {
                id: 'list-doctor',
                path: '',
                element: <Doctor />,
              },
              {
                path: 'new-doctor',
                element: <NewDoctor />,
              },
            ],
          },
          {
            id: 'rol',
            path: 'rol',
            children: [
              {
                id: 'lista-roles',
                path: '',
                element: <ListRols />,
              },
              {
                path: 'new-rol',
                element: <CreateRole />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
