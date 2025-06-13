import { memo } from 'react';
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
import { styled } from '@mui/material/styles';
import type { PopperPlacementType } from '@mui/material';
import type { IBasicIdNameDescription } from 'src/types/common.types';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.25, 0.5),
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(2px)',
  },

  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

// Styled component para la columna
const ColumnContainer = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  minHeight: '160px', // 10rem equivalente
  height: '100%',
  maxHeight: '384px', // 24rem equivalente
  overflowY: 'auto',
  transition: 'border-color 0.2s ease-in-out',

  '&:hover': {
    borderColor: theme.palette.primary.main,
  },

  '&.empty': {
    minWidth: '160px', // 10rem equivalente
  },

  [theme.breakpoints.up('lg')]: {
    maxWidth: '320px', // 20rem equivalente
  },

  // Estilos para el scrollbar
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100],
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    borderRadius: '4px',
    '&:hover': {
      background: theme.palette.grey[600],
    },
  },
}));

interface ITransferListColumnProps {
  items: IBasicIdNameDescription[];
  checkedIds: Set<number | string>;
  onToggle: (id: number | string) => void;
  isLoading?: boolean;
  placement?: PopperPlacementType;
}

// Componente memoizado del item individual para mejor performance
const TransferListItem = memo(
  ({
    item,
    isChecked,
    onToggle,
    placement,
  }: {
    item: IBasicIdNameDescription;
    isChecked: boolean;
    onToggle: (id: number | string) => void;
    placement?: PopperPlacementType;
  }) => {
    const handleClick = () => {
      onToggle(item.id);
    };

    return (
      <Tooltip
        arrow
        title={item.description || item.name}
        placement={placement}
        enterDelay={500}
        leaveDelay={200}
      >
        <StyledListItemButton
          role="listitem"
          onClick={handleClick}
          selected={isChecked}
          dense
        >
          <ListItemIcon>
            <Checkbox
              checked={isChecked}
              tabIndex={-1}
              disableRipple
              size="small"
              inputProps={{
                'aria-labelledby': `transfer-item-${item.id}`,
              }}
            />
          </ListItemIcon>
          <ListItemText
            id={`transfer-item-${item.id}`}
            primary={item.name}
            primaryTypographyProps={{
              variant: 'body2',
              noWrap: true,
            }}
          />
        </StyledListItemButton>
      </Tooltip>
    );
  },
);

TransferListItem.displayName = 'TransferListItem';

const TransferListColumn = memo(
  ({
    items,
    checkedIds,
    onToggle,
    isLoading = false,
    placement = 'top',
  }: ITransferListColumnProps) => {
    const isEmpty = items.length === 0;

    if (isLoading) {
      return (
        <ColumnContainer className={isEmpty ? 'empty' : ''}>
          <Skeleton
            variant="rectangular"
            height="160px"
            animation="wave"
            sx={{ borderRadius: 1 }}
          />
        </ColumnContainer>
      );
    }

    return (
      <ColumnContainer className={isEmpty ? 'empty' : ''}>
        {isEmpty ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            color="text.secondary"
            fontStyle="italic"
          >
            Sin elementos
          </Box>
        ) : (
          <List
            dense
            component="div"
            role="list"
            sx={{
              py: 0.5,
              // Optimización para listas largas
              '& .MuiListItemButton-root': {
                minHeight: '40px',
              },
            }}
          >
            {items.map((item) => (
              <TransferListItem
                key={item.id}
                item={item}
                isChecked={checkedIds.has(item.id)}
                onToggle={onToggle}
                placement={placement}
              />
            ))}
          </List>
        )}
      </ColumnContainer>
    );
  },
);

TransferListColumn.displayName = 'TransferListColumn';

export default TransferListColumn;
