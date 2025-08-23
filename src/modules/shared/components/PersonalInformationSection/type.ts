import type { Theme } from '@mui/material/styles';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import type {
  DateValidationError,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers/models';
import type { GENDER } from '@type/common.types';

interface ITextFields {
  id: string;
  value: string;
  disabled: boolean;
  handleChange: (e: string | React.ChangeEvent<any>) => void;
  handleOnBlur: () => void;
  helperText: string | undefined;
  error: boolean | undefined;
}

export interface IPersonalInformationSection {
  themeStyle: Theme;
  textFieldName: ITextFields;
  textFieldMiddleName: ITextFields;
  textFieldLastName: ITextFields;
  textFieldAddress?: ITextFields;
  textFieldOccupation?: ITextFields;
  selectGender?: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: GENDER | null;
  };
  birth_date?: {
    error: boolean | undefined;
    value: PickerValue | undefined;
    helperText: string | undefined;
    handleOnBlur: () => void;
    onChange: (
      newValue: PickerValue,
      context: PickerChangeHandlerContext<DateValidationError>,
    ) => void;
  };
  complete_odontogram?: {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
