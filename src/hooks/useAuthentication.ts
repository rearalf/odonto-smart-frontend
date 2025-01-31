import { useEffect } from 'react';
import useUserStore from '../stores/useUserStore';
import { useNavigate } from 'react-router';

function useAuthentication() {
  const state = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (state.access_token) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [navigate, state.access_token]);
}

export default useAuthentication;
