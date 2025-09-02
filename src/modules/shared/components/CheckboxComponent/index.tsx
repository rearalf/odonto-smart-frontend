import { Checkbox, FormControlLabel } from '@mui/material';
import type { SyntheticEvent } from 'react';

interface ICheckboxComponentProps {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
}

const CheckboxComponent = (props: ICheckboxComponentProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={props.id}
          checked={props.checked}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      }
      label={props.label}
      checked={props.checked}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  );
};

export default CheckboxComponent;
