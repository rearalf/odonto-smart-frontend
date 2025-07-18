import { Box, Typography } from '@mui/material';
import { FaUserTag } from 'react-icons/fa';

import {
  BreadCrumbs,
  TableComponent,
  ButtonComponent,
} from '@components/index';

import CreateRoleModal from './components/CreateRoleModal';
import RowRole from './components/RowRole';

import { BREADCRUMBS, TABLE_HEADER_ROLES } from './constants';
import { headerStyles } from '@styles/index';
import useListRols from './hook/useListRols';
import FilterRoles from './components/FilterRoles';

function ListRols() {
  const hook = useListRols();

  return (
    <>
      <BreadCrumbs links={BREADCRUMBS} loading={false} />

      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          Roles
        </Typography>
        <ButtonComponent
          type="button"
          color="primary"
          position="left"
          text="Nuevo rol"
          variant="contained"
          onClick={hook.handleGoToCreateRol}
          icon={
            <FaUserTag
              size={20}
              style={{ transition: 'transform 0.2s ease-in-out' }}
              className="button-icon"
            />
          }
        />
      </Box>

      <FilterRoles search={hook.search} themeStyle={hook.theme} />

      <TableComponent
        pagination
        key="roles"
        ariaLabelTable="roles"
        handleSetPage={hook.handleSetPage}
        handleSetRowsPerPage={hook.handleSetRowsPerPage}
        page={hook.page}
        loading={hook.isLoading}
        rowsPerPage={hook.rowsPerPage}
        totalData={hook.pagination?.total ?? 0}
        emptyMessage="No hay roles registrados"
        headers={TABLE_HEADER_ROLES}
        body={<RowRole roles={hook.roles} />}
      />

      <CreateRoleModal
        onClose={hook.handleToggleShowCreateRolModal}
        open={hook.showCreateRolModal}
      />
    </>
  );
}

export default ListRols;
