import type { TextFieldProps } from '@mui/material';

export interface IAutocompleteOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface IBaseAutocompleteProps {
  id: string;
  label?: string;
  placeholder?: string;
  helperText?: string | string[];
  error?: boolean;
  loading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  options: IAutocompleteOption[];
  onBlur?: () => void;
  textFieldProps?: Partial<TextFieldProps>;
}

export interface ISingleAutocompleteProps extends IBaseAutocompleteProps {
  multiple?: false;
  value: IAutocompleteOption | null;
  onChange: (value: IAutocompleteOption | null) => void;
}

export interface IMultipleAutocompleteProps extends IBaseAutocompleteProps {
  multiple: true;
  value: IAutocompleteOption[];
  onChange: (value: IAutocompleteOption[]) => void;
  maxTags?: number;
}

export type ICustomAutocompleteProps =
  | ISingleAutocompleteProps
  | IMultipleAutocompleteProps;
