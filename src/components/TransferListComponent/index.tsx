import { Box, Button } from '@mui/material';
import { useState } from 'react';

import type { IBasicIdNameDescription } from 'src/types/common.types';
import TransferListColumn from './TransferListColumn';
import './styles.css';

interface ITransferListComponentProps {
  items: IBasicIdNameDescription[];
  leftIds: (number | string)[];
  rightIds: (number | string)[];
  isLoading?: boolean;
  onChange: (
    newLeftIds: (number | string)[],
    newRightIds: (number | string)[],
  ) => void;
}

const TransferListComponent = (props: ITransferListComponentProps) => {
  const [checkedIds, setCheckedIds] = useState<(number | string)[]>([]);

  const toggleChecked = (id: number | string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const getCheckedIds = (ids: (number | string)[]) =>
    checkedIds.filter((id) => ids.includes(id));

  const leftItems = props.items.filter((item) =>
    props.leftIds.includes(item.id),
  );
  const rightItems = props.items.filter((item) =>
    props.rightIds.includes(item.id),
  );

  const handleCheckedRight = () => {
    const leftCheckedIds = getCheckedIds(props.leftIds);
    const newLeftIds = props.leftIds.filter(
      (id) => !leftCheckedIds.includes(id),
    );

    const newRightIds = [...props.rightIds, ...leftCheckedIds];

    props.onChange(newLeftIds, newRightIds);
    setCheckedIds((prev) => prev.filter((id) => !leftCheckedIds.includes(id)));
  };

  const handleCheckedLeft = () => {
    const rightCheckedIds = getCheckedIds(props.rightIds);
    const newRightIds = props.rightIds.filter(
      (id) => !rightCheckedIds.includes(id),
    );
    const newLeftIds = [...props.leftIds, ...rightCheckedIds];

    props.onChange(newLeftIds, newRightIds);
    setCheckedIds((prev) => prev.filter((id) => !rightCheckedIds.includes(id)));
  };

  return (
    <Box component="div" className="tranfer-list-component">
      <TransferListColumn
        placement="left"
        items={leftItems}
        checkedIds={checkedIds}
        onToggle={toggleChecked}
        isLoading={props.isLoading}
      />
      <Box component="div" className="tranfer-list-buttons">
        <Button
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={getCheckedIds(props.leftIds).length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={getCheckedIds(props.rightIds).length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
      </Box>
      <TransferListColumn
        placement="right"
        items={rightItems}
        checkedIds={checkedIds}
        onToggle={toggleChecked}
        isLoading={props.isLoading}
      />
    </Box>
  );
};

export default TransferListComponent;
