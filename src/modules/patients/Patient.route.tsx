import type { RouteObject } from 'react-router';

import PatientsListPage from './pages/PatientsListPage';
import NewPatientPage from './pages/NewPatientPage';

const PatientRoutes: RouteObject[] = [
  {
    id: 'patient',
    path: 'patient',
    children: [
      {
        id: 'list-patient',
        path: '',
        element: <PatientsListPage />,
      },
      {
        id: 'new-patient',
        path: 'new-patient',
        element: <NewPatientPage />,
      },
    ],
  },
];

export default PatientRoutes;
