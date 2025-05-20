type Severity = 'success' | 'info' | 'warning' | 'error';

interface IContentNotification {
  text: string;
  show: boolean;
  severity: Severity;
}

interface IBasicIdNameDescription {
  id: number;
  name: string;
  description?: string;
}
