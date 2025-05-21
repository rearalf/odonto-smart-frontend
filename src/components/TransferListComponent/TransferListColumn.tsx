import {
  Box,
  List,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tooltip,
  Skeleton,
} from '@mui/material';

interface ITransferListColumnProps {
  items: IBasicIdNameDescription[];
  checkedIds: (number | string)[];
  onToggle: (id: number | string) => void;
  isLoading?: boolean;
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
                placement="right"
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
