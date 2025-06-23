import RenderInput from './RenderInput';
import Tag from './Tag';
import type {
  IAutocompleteOption,
  ICustomAutocompleteProps,
} from 'src/types/AutocompleteComponent.type';
import {
  useTheme,
  Autocomplete,
  type AutocompleteRenderInputParams,
} from '@mui/material';

const AutocompleteComponent = (props: ICustomAutocompleteProps) => {
  const theme = useTheme();

  const sharedStyles = {
    textField: {
      '& .MuiOutlinedInput-root': {
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

  const commonProps = {
    id: props.id,
    'aria-label': props.label,
    options: props.options,
    disabled: props.disabled,
    loading: props.loading,
    loadingText: props.loadingText || 'Cargando...',
    noOptionsText: props.noOptionsText || 'Sin opciones',
    sx: sharedStyles.autocomplete,
    renderInput: (params: AutocompleteRenderInputParams) =>
      RenderInput(params, props, sharedStyles.textField),
    onBlur: props.onBlur,
  };

  if (props.multiple) {
    return (
      <Autocomplete
        {...commonProps}
        multiple
        value={props.value}
        getOptionLabel={(option) => option.name || ''}
        onChange={(_event, newValue) => {
          props.onChange(newValue as IAutocompleteOption[]);
        }}
        filterSelectedOptions
        limitTags={props.maxTags}
        renderTags={(value, getTagProps) => Tag(value, getTagProps, theme)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    );
  }

  return (
    <Autocomplete
      {...commonProps}
      value={props.value as IAutocompleteOption | null}
      getOptionLabel={(option) => option.label || option.name || ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_event, newValue) => {
        props.onChange(newValue as IAutocompleteOption | null);
      }}
      fullWidth={props.fullWidth}
      clearOnEscape
      selectOnFocus
      disableClearable={props.disableClearable ?? false}
    />
  );
};

export default AutocompleteComponent;
