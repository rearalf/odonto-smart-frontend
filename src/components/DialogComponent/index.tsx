import { isValidElement, Children } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import type { DialogProps } from '@mui/material';
import type { ReactNode } from 'react';

interface IDialogComponentProps {
  open: boolean;
  labelledby?: string;
  describedby?: string;
  fullWidth?: boolean;
  children: ReactNode;
  dialogTitle: string;
  titleId?: string;
  scroll?: DialogProps['scroll'];
  maxWidth?: DialogProps['maxWidth'];
  handleClose?: () => void;
}

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

  return (
    <Dialog
      open={props.open}
      scroll={props.scroll}
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      onClose={props.handleClose}
      aria-labelledby={props.labelledby}
      aria-describedby={props.describedby}
    >
      <DialogTitle id={props.titleId}>{props.dialogTitle}</DialogTitle>

      <DialogContent dividers>{body}</DialogContent>

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
