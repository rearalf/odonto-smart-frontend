import { FiX } from 'react-icons/fi';
import { Alert, CircularProgress, IconButton } from '@mui/material';

import useNotification from './useNotification';
import Icon from './Icon';
import './styles.css';

const Notification = () => {
  const hook = useNotification();
  return (
    <Alert
      icon={<Icon severity={hook.severity} />}
      severity={hook.severity}
      variant="filled"
      className={`notification ${hook.show ? 'show' : ''}`}
      action={
        <IconButton onClick={hook.handleChangeValue}>
          <FiX title="Cerrar" size={22} />
          <CircularProgress
            variant="determinate"
            value={hook.currentCount}
            className={hook.severity}
          />
        </IconButton>
      }
    >
      {hook.text}
    </Alert>
  );
};

export default Notification;
