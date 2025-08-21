import type { Theme } from '@mui/material/styles';
import { Avatar, Tooltip } from '@mui/material';
import { FiCamera } from 'react-icons/fi';

import alphaStyles from '@utils/alphaStyles.utils';
import { stringAvatar } from '@utils/stringAvatar';

interface IAvatarComponentProps {
  themeStyle: Theme;
  name: string;
  srcImage?: string;
  tooltipTitle?: string;
  disableInteractive?: boolean;
  placement?:
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
    | undefined;
}

const AvatarComponent = (props: IAvatarComponentProps) => {
  return (
    <Tooltip
      title={props.tooltipTitle ? props.tooltipTitle : props.name}
      placement={props.placement}
      disableInteractive={props.disableInteractive}
      disableHoverListener={
        props.tooltipTitle?.trim().length === 0 ||
        props.name.trim().length === 0
      }
      arrow
    >
      {!props.srcImage ? (
        <Avatar
          sx={{
            width: {
              xs: 100,
              sm: 100,
              md: 150,
              lg: 150,
              xl: 150,
            },
            height: {
              xs: 100,
              sm: 100,
              md: 150,
              lg: 150,
              xl: 150,
            },
            bgcolor:
              stringAvatar(props.name)?.bgcolor ||
              alphaStyles(props.themeStyle.palette.primary.main, 0.1),
            border: `2px solid ${alphaStyles(props.themeStyle.palette.primary.main, 0.2)}`,
          }}
        >
          {stringAvatar(props.name)?.children ? (
            stringAvatar(props.name)?.children
          ) : (
            <FiCamera size={32} color={props.themeStyle.palette.primary.main} />
          )}
        </Avatar>
      ) : (
        <Avatar
          src={props.srcImage}
          sx={{
            width: 100,
            height: 100,
            bgcolor: alphaStyles(props.themeStyle.palette.primary.main, 0.1),
            border: `2px solid ${alphaStyles(props.themeStyle.palette.primary.main, 0.2)}`,
          }}
        />
      )}
    </Tooltip>
  );
};

export default AvatarComponent;
