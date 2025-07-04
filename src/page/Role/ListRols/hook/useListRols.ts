import { useState } from 'react';

function useListRols() {
  const [showCreateRolModal, setshowCreateRolModal] = useState<boolean>(false);

  const handleToggleShowCreateRolModal = (_refreshData?: boolean) => {
    setshowCreateRolModal(!showCreateRolModal);
  };

  return {
    showCreateRolModal,
    handleToggleShowCreateRolModal,
  };
}

export default useListRols;
