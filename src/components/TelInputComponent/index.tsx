import { MuiTelInput, type MuiTelInputInfo } from 'mui-tel-input';

interface ITelInputComponentProps {
  value: string;
  label: string;
  error?: boolean;
  ariaLabel: string;
  helperText?: string;
  handleOnBlur?: () => void;
  handleChange: (value: string, info: MuiTelInputInfo) => void;
}

function formatPhoneNumberWithDash(input: string): string {
  // Elimina todos los caracteres excepto dígitos
  const digits = input.replace(/\D/g, '');

  // Si el número incluye código de país (11 dígitos: 50370123456)
  if (digits.startsWith('503') && digits.length === 11) {
    return `+503${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  // Si es un número nacional de 8 dígitos
  if (digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  // Si no cumple con ninguna, devuelve el número limpio (sin guiones)
  return digits;
}

const TelInputComponent = (props: ITelInputComponentProps) => (
  <MuiTelInput
    disableDropdown
    forceCallingCode
    defaultCountry="SV"
    label={props.label}
    value={props.value}
    error={props.error}
    onBlur={props.handleOnBlur}
    aria-label={props.ariaLabel}
    helperText={props.helperText}
    onChange={(value, info) => {
      const formatted = formatPhoneNumberWithDash(value);
      props.handleChange(formatted, info);
    }}
  />
);

export default TelInputComponent;
