import type { RouteObject } from 'react-router';
import CreateRole from './pages/CreateRole';
import ListRoles from './pages/ListRoles';

const RoleRoutes: RouteObject[] = [
  {
    id: 'rol',
    path: 'rol',
    children: [
      {
        id: 'lista-roles',
        path: '',
        element: <ListRoles />,
      },
      {
        id: 'create-role',
        path: 'new-rol',
        element: <CreateRole />,
      },
      {
        id: 'edit-role',
        path: ':id',
        element: <CreateRole />,
      },
    ],
  },
];

export default RoleRoutes;
