import { createBrowserRouter } from 'react-router';
import App from '../App';
import Public from '../Layouts/public';
import SignIn from '../page/auth/SignIn';

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
