import { Box, Button, Container } from '@mui/material';
import { Link } from 'react-router';
import { Formik } from 'formik';

import TextFieldBasic from '@components/TextFieldBasic';
import useSignIn from './useSignIn';
import './styles.css';

function SignIn() {
  const hook = useSignIn();
  return (
    <main className="sign-in">
      <Container maxWidth="xl" className="container">
        <Formik
          initialValues={hook.initialValues}
          validationSchema={hook.SignInSchema}
          onSubmit={(values, formikHelpers) => {
            formikHelpers.setSubmitting(true);
            hook.handleOnSubmit(values, formikHelpers);
          }}
        >
          {(props) => (
            <Box
              component="form"
              className="form"
              onSubmit={props.handleSubmit}
            >
              <img src="/assets/logo.svg" alt="Logo" className="logo" />
              <h1 className="title">Bienvenido de nuevo</h1>
              <p className="sub-title">¡Nos alegra verte otra vez!👋</p>
              <div className="inputs-group">
                <TextFieldBasic
                  id="email"
                  type="text"
                  label="Correo"
                  value={props.values.email}
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  placeholder="correo@gmail.com"
                  helperText={props.errors.email}
                  error={props.errors.email !== undefined}
                />
                <TextFieldBasic
                  id="password"
                  type="password"
                  label="Contraseña"
                  disabled={props.isSubmitting}
                  value={props.values.password}
                  onChange={props.handleChange}
                  showPassword={hook.showPassword}
                  helperText={props.errors.password}
                  error={props.errors.password !== undefined}
                  handleShowPassword={hook.handleShowPassword}
                />
              </div>
              <Link to="/" className="forget-password">
                ¿Has olvidado tu contraseña?
              </Link>
              <div className="buttons-group">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={props.isSubmitting}
                >
                  Iniciar sesión
                </Button>
              </div>
            </Box>
          )}
        </Formik>
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
