import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';

export interface IContactOption {
  value: string | number;
  label: string;
  icon?: ReactNode;
  color?: string;
}

export interface IContactTypeRadioGroupProps {
  value: string | number;
  onChange: (newValue: string | number) => void;
  options: IContactOption[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
}
