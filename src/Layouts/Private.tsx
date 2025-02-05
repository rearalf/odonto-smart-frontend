import { Outlet } from 'react-router';

import useAuthentication from '@hooks/useAuthentication';
import useSidebarStore from '@stores/useSidebarStore';
import { Navbar, SideBar } from '@components/index';

function Private() {
  useAuthentication();
  const sidebarStore = useSidebarStore();

  return (
    <>
      <Navbar />
      <SideBar />
      <main
        className={`main-container ${sidebarStore.open ? 'sidebar-open' : 'sidebar-close'}`}
      >
        <Outlet />
      </main>
    </>
  );
}

export default Private;
