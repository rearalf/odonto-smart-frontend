import { createBrowserRouter } from 'react-router';

import Dashboard from '@pages/Dashboard';
import SignIn from '@pages/auth/SignIn';
import Private from '@modules/shared/Layouts/Private';
import Public from '@modules/shared/Layouts/public';
import App from '../App';

import DoctorRoutes from '@modules/doctors/Doctor.route';
import RoleRoutes from '@modules/role/Role.route';

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
          ...RoleRoutes,
        ],
      },
    ],
  },
]);

export default router;
