import { IconButton, InputAdornment, TextField } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface ITextFieldBasicProps {
  id: string;
  label?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  multiline?: boolean;
  placeholder?: string;
  value: string | number;
  type: React.HTMLInputTypeAttribute;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  showPassword?: boolean;
  handleShowPassword?: () => void;
}

const TextFieldBasic = (props: ITextFieldBasicProps) => (
  <TextField
    minRows={4}
    id={props.id}
    name={props.id}
    variant="outlined"
    label={props.label}
    value={props.value}
    error={props.error}
    disabled={props.disabled}
    required={props.required}
    onChange={props.onChange}
    multiline={props.multiline}
    helperText={props.helperText}
    placeholder={props.placeholder}
    type={props.showPassword ? 'text' : props.type}
    InputProps={{
      minRows: 1,
      maxRows: 10,
      endAdornment: props.type === 'password' && (
        <InputAdornment position="end">
          <IconButton onClick={props.handleShowPassword}>
            {props.showPassword ? <FiEyeOff /> : <FiEye />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);

export default TextFieldBasic;
