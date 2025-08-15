import type { Severity } from '@type/common.types';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiXOctagon,
} from 'react-icons/fi';

const Icon = ({ severity }: { severity: Severity }) => {
  if (severity === 'success') return <FiCheckCircle />;
  if (severity === 'error') return <FiXOctagon />;
  if (severity === 'info') return <FiAlertCircle />;
  if (severity === 'warning') return <FiAlertTriangle />;
};

export default Icon;
