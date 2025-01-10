import { Box, Button, Container } from '@mui/material';
import { Link } from 'react-router';

import TextFieldBasic from '../../../components/TextFieldBasic';

import './styles.css';

function SignIn() {
  return (
    <main className="sign-in">
      <Container maxWidth="xl" className="container">
        <Box component="form" className="form">
          <img src="/assets/logo.svg" alt="Logo" className="logo" />
          <h1 className="title">Bienvenido de nuevo</h1>
          <p className="sub-title">¡Nos alegra verte otra vez!👋</p>
          <div className="inputs-group">
            <TextFieldBasic
              id="email"
              value={''}
              type="email"
              label="Correo"
              onChange={() => {}}
            />
            <TextFieldBasic
              value={''}
              id="password"
              type="password"
              label="Contraseña"
              onChange={() => {}}
            />
          </div>
          <Link to="/" className="forget-password">
            ¿Has olvidado tu contraseña?
          </Link>
          <div className="buttons-group">
            <Button variant="contained">Iniciar sesión</Button>
          </div>
        </Box>
        <div className="cover">
          <img
            src="/assets/image-login.svg"
            alt="Dentista"
            className="cover-image"
          />
        </div>
      </Container>
    </main>
  );
}

export default SignIn;
