import {
  Box,
  List,
  Tooltip,
  Skeleton,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import type { PopperPlacementType } from '@mui/material';

import type { IBasicIdNameDescription } from '@types/common.types';

interface ITransferListColumnProps {
  items: IBasicIdNameDescription[];
  checkedIds: (number | string)[];
  onToggle: (id: number | string) => void;
  isLoading?: boolean;
  placement?: PopperPlacementType;
}

const TransferListColumn = (props: ITransferListColumnProps) => {
  return (
    <Box
      component="div"
      className={`transfer-list-column ${props.items.length === 0 && 'transfer-list-column-empty'}`}
    >
      {props.isLoading ? (
        <Skeleton variant="rectangular" height="10rem" animation="wave" />
      ) : (
        <List dense component="div" role="list">
          {props.items.map((item) => {
            return (
              <Tooltip
                arrow
                title={item.description || item.name}
                placement={props.placement}
                key={item.id}
              >
                <ListItemButton
                  key={item.id}
                  role="listitem"
                  onClick={() => props.onToggle(item.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={props.checkedIds.includes(item.id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': item.name,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={item.id.toString()}
                    primary={item.name}
                    aria-label={item.name}
                  />
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default TransferListColumn;
