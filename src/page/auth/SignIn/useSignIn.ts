import { FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

interface ISignInForm {
  email: string;
  password: string;
}

function useSignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Correo invalido.')
      .required('El correo es obligatorio.'),
    password: Yup.string().min(8, 'Deben de ser mínimo 8 caracteres.'),
  });

  const initialValues = { email: '', password: '' };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleOnSubmit = async (
    _values: ISignInForm,
    { setSubmitting }: FormikHelpers<ISignInForm>,
  ) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 4000);
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
