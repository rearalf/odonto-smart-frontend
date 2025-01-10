import { createBrowserRouter } from 'react-router';

import SignIn from '../page/auth/SignIn';
import Public from '../Layouts/Public';
import App from '../App';

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
    ],
  },
]);

export default router;
