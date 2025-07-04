import * as Yup from 'yup';

export const newRoleSchema = Yup.object().shape({
  name: Yup.string().required('El nombre del rol es obligatorio.'),
  description: Yup.string()
    .required('La descripción del rol es obligatoria.')
    .max(255, 'La descripción excede los 255 caracteres permitidos.'),
  permission_id: Yup.array()
    .of(Yup.number().typeError('El ID del permiso debe ser un número.'))
    .min(1, 'Debe seleccionar al menos un permiso.')
    .required('Debe seleccionar al menos un permiso.'),
});
