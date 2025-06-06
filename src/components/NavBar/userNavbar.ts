import { useNavigate } from 'react-router';
import { useState } from 'react';

import type { MouseEvent } from 'react';

// import { authService } from '../../api/services';
import {
  useSidebarStore,
  useLoadingStore,
  useNotificationStore,
} from '../../stores';

function useNavbar() {
  const navigate = useNavigate();
  const loadingState = useLoadingStore();
  const sidebarStore = useSidebarStore();
  // const { logOut } = useUserStore();
  const notificationStore = useNotificationStore();

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
      // await authService.logout();
      notificationStore.handleShowNotification({
        severity: 'success',
        show: true,
        text: 'Has cerrado sesión correctamente.',
      });
      navigate('/auth');
      // logOut();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      notificationStore.handleShowNotification({
        severity: 'warning',
        show: true,
        text: 'Has cerrado sesión, pero no pudimos comunicarnos con el servidor.',
      });
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
