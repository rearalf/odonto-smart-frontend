import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import type {
  TimeValidationError,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers/models';

interface ITimePickerComponentProps {
  id: string;
  label: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  format?: string | undefined;
  value: PickerValue | undefined;
  minutesStep?: number | undefined;
  handleOnBlur?: () => void;
  onChange: (
    value: PickerValue,
    context: PickerChangeHandlerContext<TimeValidationError>,
  ) => void;
}

const TimePickerComponent = (props: ITimePickerComponentProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        closeOnSelect
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        disabled={props.disabled}
        minutesStep={props.minutesStep}
        format={props.format || 'HH:mm'}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        slotProps={{
          textField: {
            id: props.id,
            fullWidth: true,
            label: props.label,
            error: props.error,
            required: props.required,
            helperText: props.helperText,
            onBlur: props.handleOnBlur,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default TimePickerComponent;
