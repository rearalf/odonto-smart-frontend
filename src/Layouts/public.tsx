import { Outlet } from 'react-router';
import useAuthentication from '../hooks/useAuthentication';

function Public() {
  useAuthentication();
  return (
    <>
      <Outlet />
    </>
  );
}

export default Public;
