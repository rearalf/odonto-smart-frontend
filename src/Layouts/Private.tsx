import { Outlet } from 'react-router';
import { Navbar } from '../components';

function Private() {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Outlet />
      </main>
    </>
  );
}

export default Private;
