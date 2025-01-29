import { MouseEvent, useState } from 'react';

function useNavbar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSidebar = () => setOpenSidebar(!openSidebar);

  return {
    openSidebar,
    anchorElUser,
    handleSidebar,
    handleOpenUserMenu,
    handleCloseUserMenu,
  };
}

export default useNavbar;
