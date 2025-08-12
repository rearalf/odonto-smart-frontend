import { useNavigate } from 'react-router';
import { useCallback, useState, type MouseEvent } from 'react';

// import { authService } from '../../api/services';

import {
  useSidebarStore,
  useLoadingStore,
  useNotificationStore,
} from '../../stores';

function useNavbar() {
  const navigate = useNavigate();

  const sidebarStore = useSidebarStore();
  const loadingStore = useLoadingStore();
  const notificationStore = useNotificationStore();

  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null,
  );

  const openUserMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  }, []);

  const closeUserMenu = useCallback(() => {
    setUserMenuAnchor(null);
  }, []);

  const handleLogOut = async () => {
    try {
      loadingStore.setLoading(true);
      // await authService.logout();
      notificationStore.handleShowNotification({
        severity: 'success',
        show: true,
        text: 'Has cerrado sesión correctamente.',
      });
      navigate('/auth');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      notificationStore.handleShowNotification({
        severity: 'warning',
        show: true,
        text: 'Has cerrado sesión, pero no pudimos comunicarnos con el servidor.',
      });
    } finally {
      loadingStore.setLoading(false);
    }
  };

  return {
    userMenu: {
      anchorEl: userMenuAnchor,
      open: Boolean(userMenuAnchor),
      openMenu: openUserMenu,
      closeMenu: closeUserMenu,
    },
    sidebarStore,
    handleLogOut,
  };
}

export default useNavbar;
