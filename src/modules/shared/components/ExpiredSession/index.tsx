import { Box, Button, Fade, Modal } from '@mui/material';

import './styles.css';

const ExpiredSession = () => {
  // const { showAuthenticatedModa, handleLogOut, handleRefreshToken } = useAuth();
  return (
    <Modal
      open={false}
      aria-labelledby="Modal para renovar la sesión"
      aria-describedby="Este modal es usado para cuando la sesión esta expirada y puede renovar"
    >
      <Fade in={false}>
        <Box component="div" className="expired-session">
          <Box component="div" className="content">
            <h1>⚠️ La sesión ha expirado</h1>
            <p>
              Por seguridad, tu sesión ha expirado. Puedes iniciar sesión
              nuevamente o extenderla.
            </p>

            <Box className="actions">
              <Button color="primary" variant="contained" onClick={() => {}}>
                Extender sesión
              </Button>
              <Button variant="outlined" color="error" onClick={() => {}}>
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
