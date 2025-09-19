export type Severity = 'success' | 'info' | 'warning' | 'error';

export interface IContentNotification {
  text: string;
  show: boolean;
  severity: Severity;
}

export interface IBasicIdNameDescription {
  id: number | string;
  name: string;
  description?: string;
  label?: string;
}

export interface ISelectOptions {
  id: number | string;
  name: string;
}

export interface IPermissionGrouped {
  id: number;
  name: string;
  label: string;
  children: IBasicIdNameDescription[];
}

export interface IRadioButtonOptions {
  value: string | number;
  label: string;
}

export type CONTACT_TYPE_TYPE = 'EMAIL' | 'PHONE' | 'WHATSAPP';

export enum CONTACT_TYPE_ENUM {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  WHATSAPP = 'WHATSAPP',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IContactForm {
  contact_value: string;
  contact_type: CONTACT_TYPE_TYPE;
}
