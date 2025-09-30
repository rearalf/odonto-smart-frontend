import type { RouteObject } from 'react-router';

import NewInstantAppointment from './pages/NewInstantAppointment';
import AppointmentDetail from './pages/AppointmentDetail';
import AppointmentList from './pages/AppointmentList';

const AppointmentRoutes: RouteObject[] = [
  {
    id: 'appointment',
    path: 'appointment',
    children: [
      {
        id: 'appointment-list',
        path: '',
        element: <AppointmentList />,
      },
      {
        id: 'new-instant-appointment',
        path: '/appointment/new-instant/:patientId?',
        element: <NewInstantAppointment />,
      },
      {
        id: 'appointment-detail',
        path: '/appointment/:appointmentId',
        element: <AppointmentDetail />,
      },
      /* {
        id: 'create-appointment',
        path: '/appointment/create',
        element: <CreateAppointment />,
      },
      {
        id: 'attend-appointment',
        path: '/appointment/attend/:appointmentId',
        element: <AttendAppointment />,
      },
      {
        id: 'create-appointment-with-patient',
        path: '/appointment/create-with-patient',
        element: <CreateAppointmentWithPatient />,
      },
      {
        id: 'edit-appointment',
        path: '/appointment/edit/:appointmentId',
        element: <EditAppointment />,
      }, */
    ],
  },
];

export default AppointmentRoutes;
