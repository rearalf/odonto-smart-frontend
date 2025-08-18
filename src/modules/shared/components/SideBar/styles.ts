import type { SxProps, Theme } from '@mui/material';

interface IStyesProps {
  sidebarOpen: boolean;
}

function useSideBarStyes({ sidebarOpen }: IStyesProps) {
  const backgroundSideBar: SxProps<Theme> = {
    zIndex: (theme) => theme.zIndex.drawer - 1,
    position: 'absolute',
    top: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'hsla(0, 0%, 0%, 0.6)',
    left: sidebarOpen ? 0 : '-100vw',
    opacity: sidebarOpen ? 1 : 0,
    transition: 'opacity 0.1s ease-in-out',
    display: { lg: 'none' },
  };

  const drawerStyles: SxProps<Theme> = {
    '& .MuiDrawer-paper': {
      alignItems: 'center',
      overflowX: 'hidden',
      backgroundColor: '#f9fbfc',
      transform: {
        xs: sidebarOpen ? 'translateX(0px)' : 'translateX(-1000px)',
        lg: 'none',
      },
      transition: {
        xs: 'transform 0.2s ease-in-out',
        lg: 'width 0.2s ease-in-out',
      },
      width: {
        lg: sidebarOpen ? '12rem' : '4rem',
      },
    },
  };

  const containerStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    gap: '4rem',
    width: '100%',
  };

  const headerStyles: SxProps<Theme> = {
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
  };

  const headerLogoStyles: SxProps<Theme> = {
    width: '1.75rem',
    height: '1.75rem',
  };

  const headerTitleStyles: SxProps<Theme> = {
    opacity: sidebarOpen ? 1 : 0,
    minWidth: sidebarOpen ? 'auto' : 0,
    position: sidebarOpen ? 'relative' : 'absolute',
    zIndex: sidebarOpen ? 'auto' : -1,
    transition: 'opacity 0.2s ease-in-out, position 1s ease-in-out',
  };

  const itemsContentStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '0.6rem',
  };

  const floatingBtnStyles: SxProps<Theme> = {
    position: 'fixed',
    top: 60,
    left: sidebarOpen
      ? { xs: 'calc(100vw - 56px)', lg: 'calc(12rem - 20px)' }
      : { xs: '-20px', lg: 'calc(4rem - 20px)' },
    backgroundColor: 'primary.main',
    color: '#fff',
    width: '40px',
    height: '40px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)',
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
      transform: sidebarOpen
        ? 'rotate(0deg) scale(1.05)'
        : 'rotate(180deg) scale(1.05)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
    },

    '&:active': {
      transform: sidebarOpen
        ? 'rotate(0deg) scale(0.95)'
        : 'rotate(180deg) scale(0.95)',
    },
  };

  const itemStyles: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: sidebarOpen ? '0.75rem' : 0,
    fontSize: '0.875rem',
    fontWeight: 500,
    textDecoration: 'none',
    color: 'text.secondary',
    borderRadius: sidebarOpen ? '8px' : '50%',
    margin: sidebarOpen ? '0 0.5rem' : '0 auto',
    padding: sidebarOpen ? '0.75rem 1rem' : '0.75rem',
    minHeight: '48px',
    width: sidebarOpen ? 'auto' : '48px',
    justifyContent: sidebarOpen ? 'flex-start' : 'center',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',

    // Estados normales
    '&:hover': {
      backgroundColor: 'action.hover',
      color: 'primary.main',
      transform: 'translateX(2px)',
      boxShadow: sidebarOpen
        ? '0 2px 8px rgba(0,0,0,0.1)'
        : '0 4px 12px rgba(0,0,0,0.15)',
    },

    // Estado activo
    '&.active': {
      backgroundColor: 'primary.main',
      color: '#FFF',
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',

      '&:hover': {
        backgroundColor: 'primary.dark',
        transform: 'translateX(2px)',
      },

      // Indicador de estado activo
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '3px',
        height: sidebarOpen ? '24px' : '32px',
        backgroundColor: 'primary.contrastText',
        borderRadius: '0 2px 2px 0',
        opacity: sidebarOpen ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      },
    },

    // Responsive
    '@media (max-width: 1024px)': {
      margin: '0 0.5rem',
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      justifyContent: 'flex-start',
      width: 'auto',
    },
  };

  const itemsIconStyles = (iconSize: number): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    minWidth: `${iconSize}px`,
    height: `${iconSize}px`,
    transition: 'transform 0.2s ease-in-out',

    // Animación del icono en hover
    '.MuiBox-root:hover &': {
      transform: 'scale(1.1)',
    },
  });

  const itemTextStyles: SxProps<Theme> = {
    opacity: sidebarOpen ? 1 : 0,
    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-8px)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
    fontWeight: 'inherit',
    letterSpacing: '0.5px',
    minWidth: sidebarOpen ? 'auto' : 0,
    position: sidebarOpen ? 'relative' : 'absolute',
    zIndex: sidebarOpen ? 'auto' : -1,

    // En mobile siempre visible
    '@media (max-width: 1024px)': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  };

  return {
    itemStyles,
    drawerStyles,
    headerStyles,
    itemTextStyles,
    itemsIconStyles,
    containerStyles,
    headerLogoStyles,
    headerTitleStyles,
    backgroundSideBar,
    floatingBtnStyles,
    itemsContentStyles,
  };
}

export default useSideBarStyes;
