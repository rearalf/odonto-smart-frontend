import useSidebarStore from '../../stores/useSidebarStore';
import { FiChevronsLeft, FiUsers } from 'react-icons/fi';
import { Drawer, IconButton } from '@mui/material';
import { NavLink } from 'react-router';

import './styles.css';

const SideBar = () => {
  const sidebarStore = useSidebarStore();

  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${sidebarStore.open ? 'drawer-open' : 'drawer-close'}`}
    >
      <div className="container">
        <NavLink to="/" className="brand">
          <img
            alt="Logo"
            className="logo"
            src="/assets/logo.svg"
            aria-label="Odonto Smart Logo"
          />
          <span className="text">Odonto Smart</span>
        </NavLink>

        <div className="content-navbar">
          <NavLink to="/user" className="link">
            <i className="icon">
              <FiUsers />
            </i>
            <span className="text">Usuarios</span>
          </NavLink>
        </div>
      </div>

      <IconButton
        className="btn-sidebar"
        onClick={sidebarStore.handleOpenState}
      >
        <FiChevronsLeft />
      </IconButton>
    </Drawer>
  );
};

export default SideBar;
