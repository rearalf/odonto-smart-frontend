import { MouseEvent, useState } from 'react';
import useSidebarStore from '../../stores/useSidebarStore';
import { authService } from '../../api/services';
import useUserStore from '../../stores/useUserStore';

function useNavbar() {
  const sidebarStore = useSidebarStore();
  const { logOut } = useUserStore();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogOut = async () => {
    await authService.logout();
    logOut();
  };

  return {
    sidebarStore,
    anchorElUser,
    handleLogOut,
    handleOpenUserMenu,
    handleCloseUserMenu,
  };
}

export default useNavbar;
