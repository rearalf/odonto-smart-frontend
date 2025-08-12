import { type ReactElement, type ReactNode, forwardRef } from 'react';
import type { TransitionProps } from '@mui/material/transitions';
import { Slide, Dialog, DialogContent } from '@mui/material';
import type { DialogProps, SxProps } from '@mui/material';
import type { Theme } from '@emotion/react';

interface IDialogComponentProps {
  open: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  labelledby?: string;
  describedby?: string;
  handleClose?: () => void;
  sxContent?: SxProps<Theme>;
  scroll?: DialogProps['scroll'];
  maxWidth?: DialogProps['maxWidth'];
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({
  open,
  children,
  sxContent,
  labelledby,
  describedby,
  handleClose,
  maxWidth = 'sm',
  fullWidth = true,
  scroll = 'paper',
}: IDialogComponentProps) => {
  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') {
          handleClose?.();
        }
      }}
      TransitionComponent={Transition}
      scroll={scroll}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby={labelledby}
      aria-describedby={describedby}
    >
      <DialogContent sx={sxContent}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
