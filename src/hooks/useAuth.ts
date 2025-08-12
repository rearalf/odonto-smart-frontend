import {
  useLoadingStore,
  useNotificationStore,
  useUserStore,
} from '../modules/shared/stores';
import { authService } from '../api/services';

function useAuth() {
  const {
    logOut,
    setUpdateAccessToken,
    showAuthenticatedModa,
    setShowAuthenticatedModa,
  } = useUserStore();
  const { setLoading } = useLoadingStore();
  const { handleShowNotification } = useNotificationStore();

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await authService.logout();
      handleShowNotification({
        severity: 'success',
        show: true,
        text: 'Has cerrado sesión correctamente.',
      });
      logOut();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      handleShowNotification({
        severity: 'warning',
        show: true,
        text: 'Has cerrado sesión, pero no pudimos comunicarnos con el servidor.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    try {
      setLoading(true);

      const response = await authService.refreshToken();

      if (
        response?.status === 201 &&
        response.success &&
        response.data?.access_token
      ) {
        location.reload();
        setShowAuthenticatedModa(false);
        setUpdateAccessToken(response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token);
        handleShowNotification({
          severity: 'success',
          show: true,
          text: 'Sesión renovada exitosamente.',
        });
      } else {
        logOut();
        handleShowNotification({
          severity: 'warning',
          show: true,
          text: 'No se pudo renovar la sesión. Inicia sesión nuevamente.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      logOut();
      handleShowNotification({
        severity: 'error',
        show: true,
        text: 'Error al conectar con el servidor. Intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogOut,
    handleRefreshToken,
    showAuthenticatedModa,
  };
}

export default useAuth;
