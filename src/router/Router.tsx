import { createBrowserRouter } from 'react-router';

import Private from '@modules/shared/Layouts/Private';
import Public from '@modules/shared/Layouts/public';
import { MODULES } from '@config/modules';
import App from '../App';

import AppointmentRoutes from '@modules/appointment/Appointment.route';
import DashboardRoutes from '@modules/dashboard/Dashboard.route';
import PatientRoutes from '@modules/patients/Patient.route';
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
        children: [],
      },
      {
        path: '',
        element: <Private />,
        children: [
          ...DashboardRoutes,
          ...(MODULES.doctors ? DoctorRoutes : []),
          ...RoleRoutes,
          ...PatientRoutes,
          ...AppointmentRoutes,
        ],
      },
    ],
  },
]);

export default router;
