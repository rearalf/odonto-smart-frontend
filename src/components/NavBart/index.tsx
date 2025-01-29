import { FiMenu, FiUser } from 'react-icons/fi';
import { NavLink } from 'react-router';
import useNavbar from './userNavbar';
import SideBar from '../SideBar';
import {
  Box,
  Menu,
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
} from '@mui/material';

import './styles.css';

const Navbar = () => {
  const hook = useNavbar();

  return (
    <>
      <AppBar position="fixed" className="navbar">
        <Toolbar className="nav">
          <IconButton
            className="btn-menu"
            aria-label="menu"
            onClick={hook.handleSidebar}
          >
            <FiMenu />
          </IconButton>
          <NavLink to="/" className="brand">
            <img
              alt="Logo"
              className="logo"
              src="/assets/logo.svg"
              aria-label="Odonto Smart Logo"
            />
            <span>Odonto Smart</span>
          </NavLink>
          <Box>
            <IconButton
              aria-haspopup="true"
              aria-controls="menu-appbar"
              aria-label="Cuenta de usuario"
              onClick={hook.handleOpenUserMenu}
            >
              <FiUser />
            </IconButton>
            <Menu
              keepMounted
              id="menu-appbar"
              anchorEl={hook.anchorElUser}
              open={Boolean(hook.anchorElUser)}
              onClose={hook.handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={hook.handleCloseUserMenu}>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <SideBar open={hook.openSidebar} handleSidebar={hook.handleSidebar} />
    </>
  );
};

export default Navbar;
