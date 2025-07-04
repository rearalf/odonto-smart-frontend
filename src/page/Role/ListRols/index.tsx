import { Box, Typography } from '@mui/material';
import { FaUserTag } from 'react-icons/fa';

import { BreadCrumbs, ButtonComponent } from '@components/index';
import CreateRoleModal from './components/CreateRoleModal';
import { headerStyles } from '@styles/index';
import { BREADCRUMBS } from './constants';
import useListRols from './hook/useListRols';

function ListRols() {
  const { showCreateRolModal, handleToggleShowCreateRolModal } = useListRols();

  return (
    <>
      <BreadCrumbs links={BREADCRUMBS} loading={false} />

      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          Doctores
        </Typography>
        <ButtonComponent
          type="button"
          color="primary"
          position="left"
          text="Nuevo doctor"
          variant="contained"
          onClick={handleToggleShowCreateRolModal}
          icon={
            <FaUserTag
              size={20}
              style={{ transition: 'transform 0.2s ease-in-out' }}
              className="button-icon"
            />
          }
        />
      </Box>

      <CreateRoleModal
        onClose={handleToggleShowCreateRolModal}
        open={showCreateRolModal}
      />
    </>
  );
}

export default ListRols;
