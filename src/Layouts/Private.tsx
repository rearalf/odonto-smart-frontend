import { Outlet } from 'react-router';
import { Navbar } from '../components';
import SideBar from '../components/SideBar';
import useSidebarStore from '../stores/useSidebarStore';

function Private() {
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
