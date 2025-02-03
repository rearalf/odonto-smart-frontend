import { useEffect } from 'react';
import useUserStore from '../stores/useUserStore';
import { useLocation, useNavigate } from 'react-router';
import { useNotificationStore } from '../stores';

function useAuthentication() {
  const { access_token } = useUserStore();
  const { handleShowNotification } = useNotificationStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (access_token && location.pathname.startsWith('/auth')) navigate('/');
    else if (!access_token && location.pathname !== '/auth') {
      navigate('/auth');
      handleShowNotification({
        show: true,
        severity: 'info',
        text: 'Debes iniciar sesión.',
      });
    }
  }, [navigate, access_token, location, handleShowNotification]);
}

export default useAuthentication;
