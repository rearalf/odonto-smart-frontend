import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import type { PickerChangeHandlerContext } from 'node_modules/@mui/x-date-pickers/esm/models/pickers';
import type { DateValidationError } from 'node_modules/@mui/x-date-pickers/esm/models/validation';
import type { PickerValue } from '@mui/x-date-pickers/internals';

export interface IDatePickerComponent {
  id: string;
  label: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  value: PickerValue | undefined;
  onChange: (
    newValue: PickerValue,
    context: PickerChangeHandlerContext<DateValidationError>,
  ) => void;
}

const DatePickerComponent = ({
  id,
  label,
  value,
  error,
  onChange,
  required,
  disabled,
  helperText,
}: IDatePickerComponent) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        closeOnSelect
        disabled={disabled}
        onChange={onChange}
        format="DD/MM/YYYY"
        sx={{ width: '100%' }}
        label={label}
        minDate={dayjs().subtract(100, 'year')}
        maxDate={dayjs().subtract(1, 'year')}
        slotProps={{
          textField: {
            id,
            error,
            fullWidth: true,
            required: required,
            helperText: helperText || 'dd/mm/yyyy',
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
