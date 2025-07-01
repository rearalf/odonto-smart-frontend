import { LiaNotesMedicalSolid } from 'react-icons/lia';
import { Box, Typography } from '@mui/material';

import useListDoctor from './hook/useListDoctor';
import useStyles from './hook/useStyles';

import DeleteDialog from './components/DeleteDialog';
import RowDoctor from './components/RowDoctor';
import {
  BreadCrumbs,
  TableComponent,
  ButtonComponent,
} from '@components/index';

import { BREADCRUMBS, TABLE_HEADER_DOCTORS } from './constants/listDoctors';
import FilterDoctors from './components/FilterDoctors';
import DoctorDetailModal from './components/DoctorDetailModal';

function Doctor() {
  const hook = useListDoctor();
  const styles = useStyles();

  const dummyDoctor = {
    id: 1,
    qualification: 'Expert in dental surgery',
    specialty: {
      id: 1,
      name: 'Endodontics',
      description: 'Root canal treatments',
    },
    specialties: [
      { id: 2, name: 'Orthodontics', description: 'Braces and aligners' },
      { id: 3, name: 'Prosthodontics', description: 'Dental prostheses' },
    ],
    first_name: 'John',
    middle_name: 'A.',
    last_name: 'Doe',
    full_name: 'Dr. John A. Doe',
    email: 'john.doe@example.com',
    roles: [{ id: 1, name: 'Admin', description: 'System administrator' }],
    permissions: [
      { id: 2, name: 'Edit Doctors', description: 'Can edit doctor profiles' },
      { id: 3, name: 'View Reports', description: 'Can access reports' },
    ],
  };

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

      <DoctorDetailModal open={true} onClose={() => {}} doctor={dummyDoctor} />
    </>
  );
}

export default Doctor;
