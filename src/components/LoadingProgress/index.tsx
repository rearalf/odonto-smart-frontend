import { Box, CircularProgress, Fade } from '@mui/material';

import useLoadingStore from '../../stores/useLoadingStore';
import './styles.css';

const LoadingProgress = () => {
  const store = useLoadingStore();
  return (
    <Fade in={store.loading}>
      <Box component="div" className="loading-progress">
        <CircularProgress size={70} />
      </Box>
    </Fade>
  );
};

export default LoadingProgress;
