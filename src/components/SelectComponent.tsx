import { MenuItem, TextField } from '@mui/material';

interface ISelectComponentProps {
  id: string;
  label: string;
  value: number | string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  options: IBasicIdNameDescrip[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SelectComponent = (props: ISelectComponentProps) => (
  <TextField
    select
    id={props.id}
    label={props.label}
    error={props.error}
    onChange={props.onChange}
    required={props.required}
    helperText={props.helperText}
    value={props.value}
  >
    <MenuItem value="">
      <em>Seleccionar una opción</em>
    </MenuItem>
    {props.options.map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    ))}
  </TextField>
);

export default SelectComponent;
