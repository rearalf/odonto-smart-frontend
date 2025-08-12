import { Box, Button, Fade, Modal } from '@mui/material';

import useAuth from '../../../../hooks/useAuth';
import './styles.css';

const ExpiredSession = () => {
  const { showAuthenticatedModa, handleLogOut, handleRefreshToken } = useAuth();
  return (
    <Modal
      open={showAuthenticatedModa}
      aria-labelledby="Modal para renovar la sesión"
      aria-describedby="Este modal es usado para cuando la sesión esta expirada y puede renovar"
    >
      <Fade in={showAuthenticatedModa}>
        <Box component="div" className="expired-session">
          <Box component="div" className="content">
            <h1>⚠️ La sesión ha expirado</h1>
            <p>
              Por seguridad, tu sesión ha expirado. Puedes iniciar sesión
              nuevamente o extenderla.
            </p>

            <Box className="actions">
              <Button
                color="primary"
                variant="contained"
                onClick={handleRefreshToken}
              >
                Extender sesión
              </Button>
              <Button variant="outlined" color="error" onClick={handleLogOut}>
                Cerrar sesión
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ExpiredSession;
