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
    onChange={props.handleChange}
  />
);

export default TelInputComponent;
