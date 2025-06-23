type Severity = 'success' | 'info' | 'warning' | 'error';

export interface IContentNotification {
  text: string;
  show: boolean;
  severity: Severity;
}

export interface IBasicIdNameDescription {
  id: number;
  name: string;
  description?: string;
  label?: string;
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

export interface IContactForm {
  contact_value: string;
  contact_type: CONTACT_TYPE_TYPE;
}
