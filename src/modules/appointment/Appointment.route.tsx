import type { RouteObject } from 'react-router';

import NewInstantAppointment from './pages/NewInstantAppointment';

const AppointmentRoutes: RouteObject[] = [
  {
    id: 'appointment',
    path: 'appointment',
    children: [
      {
        id: 'new-instant-appointment',
        path: '/appointment/new-instant',
        element: <NewInstantAppointment />,
      },
    ],
  },
];

export default AppointmentRoutes;
