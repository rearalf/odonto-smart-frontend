import { Box, Typography } from '@mui/material';
import { FaUserTag } from 'react-icons/fa';

import {
  BreadCrumbs,
  DeleteDialog,
  TableComponent,
  ButtonComponent,
} from '@components/index';

import FilterRoles from '../components/FilterRoles';
import RowRole from '../components/RowRole';

import { BREADCRUMBS, TABLE_HEADER_ROLES } from '../constants';
import { headerStyles } from '@modules/shared/styles/index';
import useListRols from '../hooks/useListRols';

function RolLisPage() {
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

      <FilterRoles
        search={hook.search}
        themeStyle={hook.theme}
        isLoading={hook.isLoading}
        handleSearchInput={hook.handleSearchInput}
        handleClearFilter={hook.handleClearFilter}
      />

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
        body={
          <RowRole
            roles={hook.roles}
            handleShowDeleteModal={hook.handleShowDeleteModal}
          />
        }
      />

      <DeleteDialog
        title="Eliminar rol"
        description="¿Seguro que quiere eliminar el rol? Esta acción no se puede deshacer."
        theme={hook.theme}
        openDeleteModal={hook.openDeleteModal}
        handleDeleteAction={hook.handleDeleteRole}
        handleShowDeleteModal={hook.handleShowDeleteModal}
      />
    </>
  );
}

export default RolLisPage;
