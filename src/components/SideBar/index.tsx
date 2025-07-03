import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { FiChevronsLeft } from 'react-icons/fi';
import { CiMedicalMask } from 'react-icons/ci';
import { NavLink } from 'react-router';

import { useSidebarStore } from '@stores/index';
import SidebarItem from './SidebarItem';

const SideBar = () => {
  const sidebarStore = useSidebarStore();

  return (
    <>
      {/* Background Overlay */}
      <Box
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'hsla(0, 0%, 0%, 0.6)',
          left: sidebarStore.open ? 0 : '-100vw',
          opacity: sidebarStore.open ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
          display: { lg: 'none' },
        }}
        onClick={sidebarStore.handleOpenState}
      />

      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            alignItems: 'center',
            overflowX: 'hidden',
            backgroundColor: '#f9fbfc',
            transform: {
              xs: sidebarStore.open ? 'translateX(0px)' : 'translateX(-1000px)',
              lg: 'none',
            },
            transition: {
              xs: 'transform 0.2s ease-in-out',
              lg: 'width 0.2s ease-in-out',
            },
            width: {
              lg: sidebarStore.open ? '12rem' : '4rem',
            },
          },
        }}
      >
        {/* Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            gap: '4rem',
            width: '100%',
          }}
        >
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              width: '100%',
              justifyContent: 'center',
              padding: '1rem 0.8rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              alt="Logo"
              src="/assets/logo.svg"
              aria-label="Odonto Smart Logo"
              sx={{
                width: '1.75rem',
                height: '1.75rem',
              }}
            />
            <Typography
              component="span"
              sx={{
                opacity: sidebarStore.open ? 1 : 0,
                minWidth: sidebarStore.open ? 'auto' : 0,
                position: sidebarStore.open ? 'relative' : 'absolute',
                zIndex: sidebarStore.open ? 'auto' : -1,
                transition: 'opacity 0.2s ease-in-out, position 1s ease-in-out',
              }}
            >
              Odonto Smart
            </Typography>
          </Box>

          {/* Content Navbar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '0.6rem',
            }}
          >
            <SidebarItem
              to="/doctor"
              icon={CiMedicalMask}
              text="Doctores"
              isOpen={sidebarStore.open}
              iconSize={24}
            />
          </Box>
        </Box>
      </Drawer>

      {/* Floating Sidebar Toggle Button - Outside Drawer */}
      <IconButton
        onClick={sidebarStore.handleOpenState}
        sx={{
          position: 'fixed',
          top: 60,
          left: sidebarStore.open
            ? { xs: 'calc(100vw - 56px)', lg: 'calc(12rem - 20px)' }
            : { xs: '-20px', lg: 'calc(4rem - 20px)' },
          backgroundColor: 'primary.main',
          color: '#fff',
          width: '40px',
          height: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: sidebarStore.open ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          border: '2px solid',
          borderColor: 'background.paper',
          display: {
            xs: 'none',
            lg: 'flex',
          },

          '&:hover': {
            backgroundColor: 'primary.dark',
            transform: sidebarStore.open
              ? 'rotate(0deg) scale(1.05)'
              : 'rotate(180deg) scale(1.05)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
          },

          '&:active': {
            transform: sidebarStore.open
              ? 'rotate(0deg) scale(0.95)'
              : 'rotate(180deg) scale(0.95)',
          },
        }}
      >
        <FiChevronsLeft size="18" />
      </IconButton>
    </>
  );
};

export default SideBar;
