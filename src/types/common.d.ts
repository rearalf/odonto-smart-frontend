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
}

export enum CONTACT_TYPE_ENUM {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  WHATSAPP = 'WHATSAPP',
  TELEGRAM = 'TELEGRAM',
}
