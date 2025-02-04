import { useEffect, useState } from 'react';
import { getUsers } from '../../../api/services/userService';
import { useLoadingStore, useNotificationStore } from '../../../stores';

function useListUsers() {
  const notificationStore = useNotificationStore();
  const loadingStore = useLoadingStore();
  const [users, setUsers] = useState<IUsers[]>([]);

  const handleGetUsers = async () => {
    try {
      loadingStore.handleLoading();
      const response = await getUsers();
      if (response.success) {
        if (Array.isArray(response.data)) setUsers(response.data);
      } else {
        notificationStore.handleShowNotification({
          show: true,
          severity: 'error',
          text: 'Error al cargar los datos',
        });
      }
    } finally {
      loadingStore.handleLoading();
    }
  };

  useEffect(() => {
    handleGetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    users,
  };
}

export default useListUsers;
