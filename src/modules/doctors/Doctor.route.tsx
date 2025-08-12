import type { RouteObject } from 'react-router';

import DoctorListPage from './pages/DoctorsListPage';
import NewDoctorPage from './pages/NewDoctorPage';

const DoctorRoutes: RouteObject[] = [
  {
    id: 'doctor',
    path: 'doctor',
    children: [
      {
        id: 'list-doctor',
        path: '',
        element: <DoctorListPage />,
      },
      {
        path: 'new-doctor',
        element: <NewDoctorPage />,
      },
    ],
  },
];

export default DoctorRoutes;
