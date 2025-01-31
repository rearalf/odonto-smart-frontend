import { MouseEvent, useState } from 'react';

import useSidebarStore from '../../stores/useSidebarStore';
import useUserStore from '../../stores/useUserStore';
import { authService } from '../../api/services';
import useLoadingStore from '../../stores/useLoadingStore';

function useNavbar() {
  const loadingState = useLoadingStore();
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
    try {
      loadingState.handleLoading();
      await authService.logout();
      logOut();
    } finally {
      loadingState.handleLoading();
    }
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
