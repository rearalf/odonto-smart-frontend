import { Box, Button, Container } from '@mui/material';
import { Link } from 'react-router';

import TextFieldBasic from '../../../components/TextFieldBasic';

import useSignIn from './useSignIn';
import './styles.css';

function SignIn() {
  const hook = useSignIn();
  return (
    <main className="sign-in">
      <Container maxWidth="xl" className="container">
        <Box component="form" className="form" onSubmit={hook.handleOnSubmit}>
          <img src="/assets/logo.svg" alt="Logo" className="logo" />
          <h1 className="title">Bienvenido de nuevo</h1>
          <p className="sub-title">¡Nos alegra verte otra vez!👋</p>
          <div className="inputs-group">
            <TextFieldBasic
              id="email"
              type="email"
              label="Correo"
              value={hook.email}
              onChange={hook.handleOnChange}
            />
            <TextFieldBasic
              id="password"
              type="password"
              label="Contraseña"
              value={hook.password}
              onChange={hook.handleOnChange}
              showPassword={hook.showPassword}
              handleShowPassword={hook.handleShowPassword}
            />
          </div>
          <Link to="/" className="forget-password">
            ¿Has olvidado tu contraseña?
          </Link>
          <div className="buttons-group">
            <Button variant="contained" type="submit">
              Iniciar sesión
            </Button>
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
