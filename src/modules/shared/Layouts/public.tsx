import useAuthentication from '@hooks/useAuthentication';
import { Outlet } from 'react-router';

function Public() {
  useAuthentication();
  return (
    <>
      <Outlet />
    </>
  );
}

export default Public;
