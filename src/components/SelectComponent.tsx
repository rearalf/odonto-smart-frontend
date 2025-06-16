import { MenuItem, TextField } from '@mui/material';

import type { IBasicIdNameDescription } from 'src/types/common.types';

interface ISelectComponentProps {
  id: string;
  label: string;
  value: number | string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  options: IBasicIdNameDescription[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  handleOnBlur?: () => void;
}

const SelectComponent = (props: ISelectComponentProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...event,
      target: {
        ...event.target,
        name: props.id,
      },
    });
  };

  return (
    <TextField
      select
      fullWidth
      id={props.id}
      name={props.id}
      label={props.label}
      error={props.error}
      onChange={handleChange}
      required={props.required}
      helperText={props.helperText}
      onBlur={props.handleOnBlur}
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
};

export default SelectComponent;
