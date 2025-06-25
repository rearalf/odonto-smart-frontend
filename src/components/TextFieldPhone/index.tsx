import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';

interface ITextFieldPhoneProps {
  id: string;
  label?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  helperText?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  handleOnBlur?: () => void;
  format?: string; // Formato personalizable
  onSubmit?: () => void;
}

const TextFieldPhone = (props: ITextFieldPhoneProps) => (
  <PatternFormat
    format={props.format || '####-####'}
    value={props.value}
    onValueChange={(values) => {
      props.onChange(values.formattedValue);
    }}
    onBlur={props.handleOnBlur}
    disabled={props.disabled}
    customInput={TextField}
    fullWidth
    id={props.id}
    name={props.id}
    variant="outlined"
    label={props.label}
    error={props.error}
    required={props.required}
    aria-label={props.ariaLabel}
    helperText={props.helperText}
    placeholder={props.placeholder || '0000-0000'}
    type="tel"
    onKeyDown={(e) => {
      if (e.key === 'Enter' && props.onSubmit) {
        e.preventDefault();
        props.onSubmit();
      }
    }}
  />
);

export default TextFieldPhone;
