import { isValidElement, Children, forwardRef } from 'react';
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import type { TransitionProps } from '@mui/material/transitions';
import type { DialogProps, SxProps } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';
import type { Theme } from '@emotion/react';

interface IDialogComponentProps {
  open: boolean;
  labelledby?: string;
  describedby?: string;
  fullWidth?: boolean;
  children: ReactNode;
  dialogTitle?: string;
  titleId?: string;
  scroll?: DialogProps['scroll'];
  maxWidth?: DialogProps['maxWidth'];
  handleClose?: () => void;
  sxBody?: SxProps<Theme>;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = (props: IDialogComponentProps) => {
  let body: ReactNode = null;
  let footer: ReactNode = null;

  Children.forEach(props.children, (child) => {
    if (isValidElement(child)) {
      if (child.type === DialogComponent.Body) {
        body = child.props.children;
      }
      if (child.type === DialogComponent.Footer) {
        footer = child.props.children;
      }
    }
  });

  if (!props.open) return null;

  return (
    <Dialog
      open={props.open}
      slots={{
        transition: Transition,
      }}
      scroll={props.scroll}
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      onClose={props.handleClose}
      aria-labelledby={props.labelledby}
      aria-describedby={props.describedby}
    >
      <DialogTitle id={props.titleId}>{props.dialogTitle}</DialogTitle>

      <DialogContent sx={props.sxBody}>{body}</DialogContent>

      <DialogActions>{footer}</DialogActions>
    </Dialog>
  );
};

DialogComponent.Body = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
DialogComponent.Footer = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

export default DialogComponent;
