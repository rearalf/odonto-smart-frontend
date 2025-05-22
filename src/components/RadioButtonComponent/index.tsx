import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import type { IRadioButtonOptions } from 'src/types/common.types';

interface IRadioButtonComponentProps {
  id: string;
  row?: boolean;
  label?: string;
  defaultValue?: string | number;
  options: IRadioButtonOptions[];
}

const RadioButtonComponent = (props: IRadioButtonComponentProps) => {
  return (
    <FormControl>
      <FormLabel id={props.id}>{props.label}</FormLabel>
      <RadioGroup
        row={props.row}
        aria-labelledby={props.id}
        defaultValue={props.defaultValue}
        name={props.id}
      >
        {props.options.map((value) => (
          <FormControlLabel
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
