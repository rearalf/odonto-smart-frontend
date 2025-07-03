import type { FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { useLoadingStore, useNotificationStore } from '@stores/index';
import type { ISignInForm } from 'src/types/auth';
import { useNavigate } from 'react-router';

function useSignIn() {
  const navigate = useNavigate();
  const loadingState = useLoadingStore();
  const notificationStore = useNotificationStore();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Correo invalido.')
      .required('El correo es obligatorio.'),
    password: Yup.string()
      .min(1, 'Deben de ser mínimo 8 caracteres.')
      .required('La contraseña es requerida.'),
  });

  const initialValues = { email: '', password: '' };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleOnSubmit = async (
    _values: ISignInForm,
    { setSubmitting }: FormikHelpers<ISignInForm>,
  ) => {
    try {
      loadingState.setLoading(true);
      notificationStore.handleShowNotification({
        severity: 'success',
        show: true,
        text: 'Bienvenido de nuevo.',
      });
      navigate('/');

      setSubmitting(false);
    } finally {
      loadingState.setLoading(false);
    }
  };

  return {
    SignInSchema,
    showPassword,
    initialValues,
    handleOnSubmit,
    handleShowPassword,
  };
}

export default useSignIn;
