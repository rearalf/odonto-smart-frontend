import { MouseEvent, useState } from 'react';
import useSidebarStore from '../../stores/useSidebarStore';

function useNavbar() {
  const sidebarStore = useSidebarStore();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return {
    sidebarStore,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
  };
}

export default useNavbar;
