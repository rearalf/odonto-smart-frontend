import { createBrowserRouter } from 'react-router';

import Private from '@modules/shared/Layouts/Private';
import Public from '@modules/shared/Layouts/public';
import App from '../App';

import DoctorRoutes from '@modules/doctors/Doctor.route';
import RoleRoutes from '@modules/role/Role.route';
import DashboardRoutes from '@modules/dashboard/Dashboard.route';
import PatientRoutes from '@modules/patients/Patient.route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'auth',
        element: <Public />,
        children: [],
      },
      {
        path: '',
        element: <Private />,
        children: [
          ...DashboardRoutes,
          ...DoctorRoutes,
          ...RoleRoutes,
          ...PatientRoutes,
        ],
      },
    ],
  },
]);

export default router;
