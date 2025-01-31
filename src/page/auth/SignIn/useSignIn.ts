import { FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import useLoadingStore from '../../../stores/useLoadingStore';
import useUserStore from '../../../stores/useUserStore';
import { authService } from '../../../api/services/';

function useSignIn() {
  const loadingState = useLoadingStore();
  const authState = useUserStore();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Correo invalido.')
      .required('El correo es obligatorio.'),
    password: Yup.string().min(1, 'Deben de ser mínimo 8 caracteres.'),
  });

  const initialValues = { email: '', password: '' };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleOnSubmit = async (
    values: ISignInForm,
    { setSubmitting }: FormikHelpers<ISignInForm>,
  ) => {
    try {
      loadingState.handleLoading();
      const response = await authService.signin(values);
      if (response.status === 201 && response.data) {
        authState.signIn({ ...response.data });
        localStorage.setItem('access_token', response.data.access_token);
      }
      setSubmitting(false);
    } finally {
      loadingState.handleLoading();
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
