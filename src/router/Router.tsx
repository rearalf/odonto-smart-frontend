import { createBrowserRouter } from 'react-router';

import Dashboard from '@pages/Dashboard';
import SignIn from '@pages/auth/SignIn';
import Private from '@layouts/Private';
import Public from '@layouts/public';
import App from '../App';
import { CreateRole, ListRols } from '@pages/Role';

import DoctorRoutes from '@modules/doctors/Doctor.route';

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
          ...DoctorRoutes,
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
              {
                path: ':id',
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
