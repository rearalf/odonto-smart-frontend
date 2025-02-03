import { useCallback, useEffect, useState } from 'react';

import { useNotificationStore } from '../../stores';

function useNotification() {
  const store = useNotificationStore();

  const [currentCount, setCurrentCount] = useState(0);

  const handleChangeValue = useCallback(() => {
    store.handleClearNotification();
    setCurrentCount(0);
  }, [store]);

  useEffect(() => {
    const timer = () => setCurrentCount(currentCount + 1);

    if (store.show) {
      if (currentCount === 100) {
        handleChangeValue();
        return;
      }
      const id = setInterval(timer, 100);
      return () => clearInterval(id);
    }
  }, [currentCount, handleChangeValue, store]);

  return {
    currentCount,
    show: store.show,
    text: store.text,
    severity: store.severity,
    handleChangeValue,
  };
}

export default useNotification;
