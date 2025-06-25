import { Button, type SxProps } from '@mui/material';
import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';

interface IButtonComponentProps {
  text: string;
  icon?: ReactNode;
  position?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const ButtonComponent = (props: IButtonComponentProps) => {
  const stylesSX: SxProps<Theme> = {
    width: { xs: '100%', sm: 'auto' },
    borderRadius: 2,
    fontWeight: 600,
    fontSize: '0.95rem',
    textTransform: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      '& .button-icon': {
        transform: 'scale(1.1) rotate(5deg)',
      },
    },
    '&:active': {
      transform: 'translateY(0px)',
      transition: 'transform 0.1s',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background:
        'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
      transform: 'scale(0)',
      transition: 'transform 0.5s',
      zIndex: 0,
    },
    ...props.sx,
  };
  return (
    <Button
      sx={stylesSX}
      size={props.size}
      type={props.type}
      title={props.text}
      color={props.color}
      aria-label={props.text}
      onClick={props.onClick}
      variant={props.variant}
      className={props.className}
      endIcon={props.position === 'right' ? props.icon : undefined}
      startIcon={props.position === 'left' ? props.icon : undefined}
    >
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
