import { TestContext } from 'yup';

export function validateStrongPassword(
  value: string | undefined,
  context: TestContext,
) {
  if (!value) return false;

  const errors = [];
  if (!/[a-z]/.test(value)) errors.push('una minúscula');
  if (!/[A-Z]/.test(value)) errors.push('una mayúscula');
  if (!/\d/.test(value)) errors.push('un número');
  if (!/[\W_]/.test(value)) errors.push('un carácter especial (!@#$%)');

  if (errors.length > 0) {
    return context.createError({
      message: `La contraseña debe incluir: ${errors.join(', ')}.`,
    });
  }

  return true;
}
