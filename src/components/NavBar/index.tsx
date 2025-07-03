import { FiMenu, FiUser } from 'react-icons/fi';
import { NavLink } from 'react-router';
import {
  Box,
  Menu,
  AppBar,
  Tooltip,
  Toolbar,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';

import useNavbar from './userNavbar';

const Navbar = () => {
  const hook = useNavbar();

  return (
    <AppBar
      position="fixed"
      sx={{
        // zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: 'padding-left 0.2s ease-in-out',
        backgroundColor: '#f9fbfc',
        pl: {
          xs: '0rem',
          lg: hook.sidebarStore.open ? '12rem' : '4rem',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: {
              md: 'space-between',
              lg: 'center',
            },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <IconButton
            aria-label="Abrir menú"
            onClick={hook.sidebarStore.handleOpenState}
            edge="start"
            size="large"
            sx={{
              fontSize: {
                xs: '1.4rem',
                md: '1.8rem',
              },
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <FiMenu />
          </IconButton>

          <NavLink
            to="/"
            style={
              {
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 800,
                flex: 1,

                flexGrow: {
                  lg: 1,
                },
                justifyContent: 'center',
              } as any
            }
          >
            <Box
              component="img"
              src="/assets/logo.svg"
              alt="Logo de Odonto Smart"
              sx={{
                width: {
                  xs: '1.6rem',
                  md: '2rem',
                },
                height: {
                  xs: '1.6rem',
                  md: '2rem',
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: '1.2rem',
                  md: '1.5rem',
                },
              }}
            >
              Odonto Smart
            </Typography>
          </NavLink>
        </Box>

        <Box>
          <Tooltip title="Cuenta de usuario">
            <IconButton
              onClick={hook.userMenu.openMenu}
              aria-controls={hook.userMenu.anchorEl ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              size="large"
              sx={{
                fontSize: {
                  xs: '1.4rem',
                  md: '1.8rem',
                },
              }}
            >
              <FiUser />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={hook.userMenu.anchorEl}
            open={Boolean(hook.userMenu.anchorEl)}
            onClose={hook.userMenu.closeMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={hook.handleLogOut}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
