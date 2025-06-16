import { useTheme, TextField, Autocomplete } from '@mui/material';
import type {
  IAutocompleteOption,
  ICustomAutocompleteProps,
} from 'src/types/AutocompleteComponent.type';
import Tag from './Tag';

const AutocompleteComponent = (props: ICustomAutocompleteProps) => {
  const theme = useTheme();

  const sharedStyles = {
    textField: {
      '& .MuiOutlinedInput-root': {
        // backgroundColor: theme.palette.background.paper,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      },
    },
    autocomplete: {
      '& .MuiAutocomplete-popupIndicator': {
        color: theme.palette.primary.main,
      },
      '& .MuiAutocomplete-inputRoot': {
        paddingRight: '9px !important',
      },
      '& .MuiAutocomplete-endAdornment': {
        right: '9px',
      },
    },
  };

  if (props.multiple) {
    return (
      <Autocomplete
        multiple
        id={props.id}
        aria-label={props.label}
        options={props.options}
        getOptionLabel={(option) => option.name}
        value={props.value}
        onChange={(_event, newValue) => {
          props.onChange(newValue as IAutocompleteOption[]);
        }}
        filterSelectedOptions
        limitTags={props.maxTags}
        disabled={props.disabled}
        sx={sharedStyles.autocomplete}
        renderTags={(value, getTagProps) => Tag(value, getTagProps, theme)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Buscar especialidades..."
            error={props.error}
            onBlur={props.onBlur}
            required={props.required}
            helperText={props.helperText}
            sx={sharedStyles.textField}
          />
        )}
      />
    );
  }

  return (
    <Autocomplete
      id={props.id}
      aria-label={props.label}
      options={props.options}
      getOptionLabel={(option) => option.label || ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={props.value as IAutocompleteOption | null}
      onChange={(_event, newValue) => {
        props.onChange(newValue as IAutocompleteOption | null);
      }}
      onBlur={props.onBlur}
      loading={props.loading}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      loadingText={props.loadingText}
      noOptionsText={props.noOptionsText}
      sx={sharedStyles.autocomplete}
      clearOnEscape
      selectOnFocus
      disableClearable={false}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props.textFieldProps}
          variant="outlined"
          label={props.label}
          disabled={props.disabled}
          placeholder={props.placeholder}
          error={props.error}
          onBlur={props.onBlur}
          required={props.required}
          helperText={props.helperText}
          sx={sharedStyles.textField}
        />
      )}
    />
  );
};

export default AutocompleteComponent;
