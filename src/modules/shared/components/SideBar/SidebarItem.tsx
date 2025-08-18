import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import { NavLink } from 'react-router';

import type { ComponentType } from 'react';

interface ISidebarItemProps {
  to: string;
  icon: ComponentType<{ size?: number }>;
  text: string;
  iconSize: number;
  itemStyles: SxProps<Theme>;
  itemTextStyles: SxProps<Theme>;
  itemsIconStyles: (iconSize: number) => SxProps<Theme>;
}

const SidebarItem = ({
  to,
  icon: Icon,
  text,
  itemTextStyles,
  iconSize = 24,
  itemStyles,
  itemsIconStyles,
}: ISidebarItemProps) => {
  return (
    <Box component={NavLink} to={to} sx={itemStyles}>
      {/* Icono */}
      <Box sx={itemsIconStyles(iconSize)}>
        <Icon size={iconSize} />
      </Box>

      {/* Texto */}
      <Typography component="span" sx={itemTextStyles}>
        {text}
      </Typography>
    </Box>
  );
};

export default SidebarItem;
