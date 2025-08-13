import type { RouteObject } from 'react-router';
import Dashboard from './pages/Dashboard';

const DashboardRoutes: RouteObject[] = [
  {
    id: 'dashboard',
    path: 'dashboard',
    element: <Dashboard />,
  },
];

export default DashboardRoutes;
