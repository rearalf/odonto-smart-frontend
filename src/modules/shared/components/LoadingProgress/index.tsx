import { Box, CircularProgress, Fade, useTheme } from '@mui/material';
import useLoadingStore from '../../stores/useLoadingStore';

const LoadingProgress = () => {
  const store = useLoadingStore();
  const theme = useTheme();

  if (!store.loading) return null;

  return (
    <Fade in={store.loading}>
      <Box
        component="div"
        role="status"
        aria-live="polite"
        sx={{
          backgroundColor:
            theme.palette.mode !== 'dark'
              ? 'rgba(0, 0, 0, 0.6)'
              : 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(4px)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1300,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          size={70}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </Box>
    </Fade>
  );
};

export default LoadingProgress;
