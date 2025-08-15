import type { ICustomAutocompleteProps } from '@components/AutocompleteComponent/type';
import {
  TextField,
  CircularProgress,
  type AutocompleteRenderInputParams,
} from '@mui/material';

const RenderInput = (
  params: AutocompleteRenderInputParams,
  props: ICustomAutocompleteProps,
  textField: any,
) => (
  <TextField
    {...params}
    {...(props.multiple ? {} : props.textFieldProps)}
    variant="outlined"
    label={props.label}
    placeholder={props.placeholder}
    error={props.error}
    // required={props.required}
    helperText={props.helperText}
    disabled={props.disabled}
    onBlur={props.onBlur}
    sx={textField}
    InputLabelProps={{
      required: props.required,
    }}
    InputProps={{
      ...params.InputProps,
      endAdornment: (
        <>
          {props.loading && <CircularProgress color="inherit" size={20} />}
          {params.InputProps.endAdornment}
        </>
      ),
    }}
  />
);

export default RenderInput;
