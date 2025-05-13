import useSidebarStore from '../../stores/useSidebarStore';
import { Drawer, IconButton } from '@mui/material';
import { FiChevronsLeft } from 'react-icons/fi';
import { CiMedicalMask } from 'react-icons/ci';
import { NavLink } from 'react-router';

import './styles.css';

const SideBar = () => {
  const sidebarStore = useSidebarStore();

  return (
    <>
      <div
        className={`background-sidebar ${sidebarStore.open ? 'background-open' : 'background-close'}`}
        onClick={sidebarStore.handleOpenState}
      />
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
            <NavLink to="/doctor" className="link">
              <i className="icon">
                <CiMedicalMask size="26" />
              </i>
              <span className="text">Doctores</span>
            </NavLink>
          </div>
        </div>

        <IconButton
          className="btn-sidebar"
          onClick={sidebarStore.handleOpenState}
        >
          <FiChevronsLeft size="20" />
        </IconButton>
      </Drawer>
    </>
  );
};

export default SideBar;
