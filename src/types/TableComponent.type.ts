import type { ReactNode } from 'react';

export type HeaderObject = {
  title: string;
  key: string;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify';
};

export interface ITableComponent {
  page: number;
  body: ReactNode;
  headers: HeaderObject[] | ReactNode;
  totalData: number;
  pagination: boolean;
  rowsPerPage: number;
  ariaLabelTable: string;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  dense?: boolean;
  maxHeight?: number | string;
  handleSetPage: (value: number) => void;
  handleSetRowsPerPage: (value: number) => void;
}
