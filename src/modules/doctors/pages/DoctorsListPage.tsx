import { LiaNotesMedicalSolid } from 'react-icons/lia';
import { Box, Typography } from '@mui/material';

import useListDoctor from '../hooks/useListDoctor';
import useStyles from '../hooks/useStyles';

import DeleteDialog from '../components/DeleteDialog';
import RowDoctor from '../components/RowDoctor';
import {
  BreadCrumbs,
  TableComponent,
  ButtonComponent,
} from 'src/modules/shared/components/index';

import { BREADCRUMBS, TABLE_HEADER_DOCTORS } from '../constants/listDoctors';
import FilterDoctors from '../components/FilterDoctors';
import DoctorDetailModal from '../components/DoctorDetailModal';

function DoctorListPage() {
  const hook = useListDoctor();
  const styles = useStyles();

  return (
    <>
      <BreadCrumbs links={BREADCRUMBS} loading={false} />

      <Box component="header" sx={styles.headerStyles}>
        <Typography variant="h4" component="h1">
          Doctores
        </Typography>
        <ButtonComponent
          type="button"
          color="primary"
          position="left"
          text="Nuevo doctor"
          variant="contained"
          onClick={hook.handleNewDoctor}
          icon={
            <LiaNotesMedicalSolid
              size={20}
              style={styles.headerIconStyles}
              className="button-icon"
            />
          }
        />
      </Box>

      <FilterDoctors
        search={hook.search}
        specialtyId={hook.specialtyId}
        paperStyles={styles.paperStyles}
        handleSearch={hook.handleSearch}
        handleSearchInput={hook.handleSearchInput}
        handleClearFilter={hook.handleClearFilter}
        handleSetSpecialty={hook.handleSetSpecialty}
      />

      <TableComponent
        pagination
        key="doctor"
        ariaLabelTable="doctores"
        handleSetPage={hook.handleSetPage}
        handleSetRowsPerPage={hook.handleSetRowsPerPage}
        page={hook.page}
        loading={hook.isLoading}
        rowsPerPage={hook.rowsPerPage}
        totalData={hook.pagination?.total ?? 0}
        emptyMessage="No hay doctores registrados"
        headers={TABLE_HEADER_DOCTORS}
        body={
          <RowDoctor
            doctors={hook.doctors}
            handleShowDeleteModal={hook.handleShowDeleteModal}
            handleShowModalDoctorDetail={hook.handleShowModalDoctorDetail}
          />
        }
      />

      <DeleteDialog
        theme={styles.theme}
        alphafunction={styles.alphafunction}
        openDeleteModal={hook.openDeleteModal}
        handleDeleteDoctor={hook.handleDeleteDoctor}
        handleShowDeleteModal={hook.handleShowDeleteModal}
      />

      <DoctorDetailModal
        open={hook.openModal}
        doctor={hook.dataDoctorDetail}
        onClose={hook.handleShowModalDoctorDetail}
        isLoadingDoctorDetail={hook.isLoadingDoctorDetail}
      />
    </>
  );
}

export default DoctorListPage;
