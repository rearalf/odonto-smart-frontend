import { useEffect } from 'react';
import useUserStore from '../stores/useUserStore';
import { useLocation, useNavigate } from 'react-router';
import { useNotificationStore } from '../stores';
import { axiosInstanceWithAuth } from '../api/axios/axiosInstance';

function useAuthentication() {
  const { access_token, setShowAuthenticatedModa } = useUserStore();
  const { handleShowNotification } = useNotificationStore();

  const navigate = useNavigate();
  const location = useLocation();

  axiosInstanceWithAuth.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        setShowAuthenticatedModa(true);
      }
      return Promise.reject(error);
    },
  );

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
