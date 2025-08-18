import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { NavLink } from 'react-router';

import { HiOutlineUserGroup } from 'react-icons/hi';
import { FiChevronsLeft } from 'react-icons/fi';
import { CiMedicalMask } from 'react-icons/ci';
import { FaHeartbeat } from 'react-icons/fa';

import { useSidebarStore } from 'src/modules/shared/stores/index';
import SideBarItem from './SideBarItem';
import useSideBarStyes from './styles';

const SideBar = () => {
  const sidebarStore = useSidebarStore();
  const styles = useSideBarStyes({
    sidebarOpen: sidebarStore.open,
  });

  return (
    <>
      {/* Background Overlay */}
      <Box
        sx={styles.backgroundSideBar}
        onClick={sidebarStore.handleOpenState}
      />

      <Drawer variant="permanent" sx={styles.drawerStyles}>
        {/* Container */}
        <Box sx={styles.containerStyles}>
          {/* Content Navbar */}
          <Box component={NavLink} to="/" sx={styles.headerStyles}>
            <Box
              component="img"
              alt="Logo"
              src="/assets/logo.svg"
              aria-label="Odonto Smart Logo"
              sx={styles.headerLogoStyles}
            />
            <Typography component="span" sx={styles.headerTitleStyles}>
              Odonto Smart
            </Typography>
          </Box>

          <Box sx={styles.itemsContentStyles}>
            <SideBarItem
              to="/doctor"
              text="Doctores"
              iconSize={24}
              icon={CiMedicalMask}
              itemStyles={styles.itemStyles}
              itemTextStyles={styles.itemTextStyles}
              itemsIconStyles={styles.itemsIconStyles}
            />
            <SideBarItem
              to="/rol"
              text="Roles"
              iconSize={24}
              icon={HiOutlineUserGroup}
              itemStyles={styles.itemStyles}
              itemTextStyles={styles.itemTextStyles}
              itemsIconStyles={styles.itemsIconStyles}
            />
            <SideBarItem
              to="/patient"
              text="Pacientes"
              iconSize={24}
              icon={FaHeartbeat}
              itemStyles={styles.itemStyles}
              itemTextStyles={styles.itemTextStyles}
              itemsIconStyles={styles.itemsIconStyles}
            />
          </Box>
        </Box>
      </Drawer>

      {/* Floating Sidebar Toggle Button - Outside Drawer */}
      <IconButton
        onClick={sidebarStore.handleOpenState}
        sx={styles.floatingBtnStyles}
      >
        <FiChevronsLeft size="18" />
      </IconButton>
    </>
  );
};

export default SideBar;
