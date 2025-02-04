import { useLoadingStore, useNotificationStore, useUserStore } from '../stores';
import { authService } from '../api/services';

function useAuth() {
  const {
    logOut,
    setUpdateAccessToken,
    showAuthenticatedModa,
    setShowAuthenticatedModa,
  } = useUserStore();
  const { handleLoading } = useLoadingStore();
  const { handleShowNotification } = useNotificationStore();

  const handleLogOut = async () => {
    try {
      handleLoading();
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
      handleLoading();
    }
  };

  const handleRefreshToken = async () => {
    try {
      handleLoading();

      const response = await authService.refreshToken();

      if (
        response?.status === 201 &&
        response.success &&
        response.data?.access_token
      ) {
        // location.reload();
        setUpdateAccessToken(response.data.access_token);
        setShowAuthenticatedModa(false);
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
      handleLoading();
    }
  };

  return {
    handleLogOut,
    handleRefreshToken,
    showAuthenticatedModa,
  };
}

export default useAuth;
