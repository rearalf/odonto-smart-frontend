import { Button, type SxProps } from '@mui/material';
import type { Theme } from '@emotion/react';
import { buttonStylesSX } from './styles';
import {
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';

interface IButtonComponentProps {
  text: string;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  position?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  sx?: SxProps<Theme>;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}

const ButtonComponent = (props: IButtonComponentProps) => {
  const defaultIconClass = 'button-icon';
  const defaultIconSize = 20;
  const defaultIconStyle: React.CSSProperties = {
    transition: 'transform 0.2s ease-in-out',
  };

  const icon =
    isValidElement(props.icon) && typeof props.icon.type !== 'string'
      ? cloneElement(props.icon as ReactElement, {
          size: props.icon.props?.size ?? defaultIconSize,
          className: [defaultIconClass, props.icon.props?.className]
            .filter(Boolean)
            .join(' '),
          style: {
            ...defaultIconStyle,
            ...(props.icon.props?.style || {}),
          },
        })
      : props.icon;

  const styles = {
    ...buttonStylesSX,
    ...props.sx,
  };

  return (
    <Button
      sx={styles}
      size={props.size}
      type={props.type}
      title={props.text}
      color={props.color}
      aria-label={props.text}
      onClick={props.onClick}
      variant={props.variant}
      loading={props.loading}
      disabled={props.disabled}
      className={props.className}
      fullWidth={props.fullWidth}
      endIcon={props.position === 'right' ? icon : undefined}
      startIcon={props.position === 'left' ? icon : undefined}
    >
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
