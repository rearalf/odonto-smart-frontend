import { Drawer, IconButton } from '@mui/material';
import { NavLink } from 'react-router';
import { FiChevronsLeft, FiUsers } from 'react-icons/fi';

import './styles.css';

interface ISideBarProps {
  open: boolean;
  handleSidebar: () => void;
}

const SideBar = (props: ISideBarProps) => {
  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${props.open ? 'drawer-open' : 'drawer-close'}`}
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
          <NavLink to="/" className="link">
            <i className="icon">
              <FiUsers />
            </i>
            <span className="text">Pacientes</span>
          </NavLink>
        </div>
      </div>

      <IconButton className="btn-sidebar" onClick={props.handleSidebar}>
        <FiChevronsLeft />
      </IconButton>
    </Drawer>
  );
};

export default SideBar;
