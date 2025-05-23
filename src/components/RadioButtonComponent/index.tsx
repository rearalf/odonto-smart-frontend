import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import type { IRadioButtonOptions } from 'src/types/common.types';
import type { ChangeEvent } from 'react';

interface IRadioButtonComponentProps {
  id: string;
  row?: boolean;
  label?: string;
  value: string | number;
  defaultValue?: string | number;
  options: IRadioButtonOptions[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonComponent = (props: IRadioButtonComponentProps) => {
  return (
    <FormControl>
      <FormLabel id={props.id}>{props.label}</FormLabel>
      <RadioGroup
        row={props.row}
        name={props.id}
        aria-labelledby={props.id}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((value) => (
          <FormControlLabel
            key={value.value}
            value={value.value}
            control={<Radio />}
            label={value.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonComponent;
