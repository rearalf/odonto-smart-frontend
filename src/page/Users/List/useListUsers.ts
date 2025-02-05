import { useEffect, useState } from 'react';

import { useLoadingStore, useNotificationStore } from '@stores/index';
import { getUsers } from '@api/services/userService';

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
      } else if (response.status === 401) {
        notificationStore.handleShowNotification({
          show: true,
          severity: 'error',
          text:
            response.data && response.data.message
              ? response.data.message
              : 'Error al cargar los datos',
        });
      } else {
        notificationStore.handleShowNotification({
          show: true,
          severity: 'error',
          text:
            response.data && response.data.message
              ? response.data.message
              : 'Error al cargar los datos',
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
