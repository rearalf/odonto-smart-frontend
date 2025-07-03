import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router';

import type { ComponentType } from 'react';

interface ISidebarItemProps {
  to: string;
  icon: ComponentType<{ size?: number }>;
  text: string;
  isOpen: boolean;
  iconSize: number;
}

const SidebarItem = ({
  to,
  icon: Icon,
  text,
  isOpen,
  iconSize = 24,
}: ISidebarItemProps) => {
  return (
    <Box
      component={NavLink}
      to={to}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: isOpen ? '0.75rem' : 0,
        fontSize: '0.875rem',
        fontWeight: 500,
        textDecoration: 'none',
        color: 'text.secondary',
        borderRadius: isOpen ? '8px' : '50%',
        margin: isOpen ? '0 0.5rem' : '0 auto',
        padding: isOpen ? '0.75rem 1rem' : '0.75rem',
        minHeight: '48px',
        width: isOpen ? 'auto' : '48px',
        justifyContent: isOpen ? 'flex-start' : 'center',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',

        // Estados normales
        '&:hover': {
          backgroundColor: 'action.hover',
          color: 'primary.main',
          transform: 'translateX(2px)',
          boxShadow: isOpen
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
            height: isOpen ? '24px' : '32px',
            backgroundColor: 'primary.contrastText',
            borderRadius: '0 2px 2px 0',
            opacity: isOpen ? 1 : 0,
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
      }}
    >
      {/* Icono */}
      <Box
        sx={{
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
        }}
      >
        <Icon size={iconSize} />
      </Box>

      {/* Texto */}
      <Typography
        component="span"
        sx={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateX(0)' : 'translateX(-8px)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          whiteSpace: 'nowrap',
          fontWeight: 'inherit',
          letterSpacing: '0.5px',
          minWidth: isOpen ? 'auto' : 0,
          position: isOpen ? 'relative' : 'absolute',
          zIndex: isOpen ? 'auto' : -1,

          // En mobile siempre visible
          '@media (max-width: 1024px)': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default SidebarItem;
