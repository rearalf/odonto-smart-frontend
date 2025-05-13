import { useState } from 'react';
import * as Yup from 'yup';

function useNewDoctor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, _setActiveStep] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skipped, _setSkipped] = useState(new Set<number>());

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [specialties, _setSpecialties] = useState<IBasicIdNameDescrip[]>([
    {
      id: 1,
      name: '$',
    },
    {
      id: 2,
      name: '€',
    },
    {
      id: 3,
      name: '฿',
    },
    {
      id: 4,
      name: '¥',
    },
  ]);

  const formSchema = Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .required('El primer nombre es obligatorio.'),
    middle_name: Yup.string().trim(),
    last_name: Yup.string().trim().required('Los apellidos son obligatorios.'),
    qualification: Yup.string().trim(),
    email: Yup.string()
      .trim()
      .email('Correo invalido.')
      .required('El correo es obligatorio.'),
    password: Yup.string()
      .trim()
      .min(1, 'Deben de ser mínimo 8 caracteres.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Contraseña inválida',
      )
      .test('is-strong', 'Contraseña inválida', function (value) {
        if (!value) return false;
        if (value.length < 8) return false;
      })
      .required('La contraseña es requerida.'),
    confirmPassword: Yup.string()
      .trim()
      .min(1, 'Deben de ser mínimo 8 caracteres.')
      .required('La contraseña es requerida.')
      .oneOf([Yup.ref('password')], 'Las contraseñas deben de ser iguales'),
    specialty: Yup.number().required('El doctor debe tener una especialidad.'),
  });

  const initialValues = {
    first_name: '',
    middle_name: '',
    last_name: '',
    qualification: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
  };

  const steps = [
    'Formulario principal',
    'Agregar especialidades y contactos',
    'Agregar roles y permisos',
  ];
  const breadCrumbs: ILink[] = [
    {
      link_name: 'Dashboard',
      link_to: '/',
    },
    {
      link_name: 'Doctores',
      link_to: '/doctor',
    },
    {
      link_name: 'Nuevo doctor',
      link_to: 'new-doctor',
    },
  ];

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);
  const handleShowConfirmPassword = () =>
    setIsShowConfirmPassword(!isShowConfirmPassword);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  return {
    activeStep,
    specialties,
    isShowPassword,
    isShowConfirmPassword,
    steps,
    formSchema,
    breadCrumbs,
    initialValues,
    isStepSkipped,
    handleShowPassword,
    handleShowConfirmPassword,
  };
}

export default useNewDoctor;
