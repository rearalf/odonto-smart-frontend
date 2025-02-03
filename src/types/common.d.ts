type Severity = 'success' | 'info' | 'warning' | 'error';

interface IContentNotification {
  text: string;
  show: boolean;
  severity: Severity;
}
