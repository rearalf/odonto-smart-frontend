import { ChangeEvent, FormEvent, useState } from 'react';

function useSignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'password') setPassword(e.target.value);
    if (e.target.id === 'email') setEmail(e.target.value);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassword('');
    setEmail('');
  };

  return {
    email,
    password,
    showPassword,
    handleOnSubmit,
    handleOnChange,
    handleShowPassword,
  };
}

export default useSignIn;
