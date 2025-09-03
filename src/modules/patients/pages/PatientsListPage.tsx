import { FaHeartbeat, FaPlus } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

import {
  BreadCrumbs,
  ButtonComponent,
  TableComponent,
} from '@components/index';

import {
  BREADCRUMBSPATIENTSLIST,
  TABLE_HEADER_PATIENTS,
} from '../constants/index.const';
import usePatientsListPage from '../hooks/usePatientsListPage';
import FilterPatient from '../components/FilterPatient';
import RowPatient from '../components/RowPatient';
import useStyles from '../hooks/useStyles';

function PatientsListPage() {
  const hook = usePatientsListPage();
  const styles = useStyles();
  return (
    <>
      <BreadCrumbs links={BREADCRUMBSPATIENTSLIST} loading={false} />

      <Box component="header" sx={styles.headerStyles}>
        <Typography variant="h4" component="h1">
          Pacientes
        </Typography>
        <ButtonComponent
          type="button"
          color="primary"
          position="left"
          text="Nuevo pacientes"
          variant="contained"
          onClick={hook.handleNewPatient}
          icon={
            <>
              <FaHeartbeat
                style={styles.headerIconStyles}
                className="button-icon"
              />
              <FaPlus
                style={styles.headerIconStyles}
                className="button-icon"
                size={10}
              />
            </>
          }
        />
      </Box>

      <FilterPatient
        search={hook.search}
        themeStyle={styles.theme}
        handleClearFilter={hook.handleClearFilter}
        handleSearch={hook.handleSearch}
        handleSearchInput={hook.handleSearchInput}
      />

      <TableComponent
        pagination
        key="Patients"
        ariaLabelTable="Lista de pacientes"
        handleSetPage={hook.handleSetPage}
        handleSetRowsPerPage={hook.handleSetRowsPerPage}
        page={hook.page}
        loading={hook.isLoading}
        rowsPerPage={hook.rowsPerPage}
        totalData={
          hook.pagination && hook.pagination.total ? hook.pagination.total : 0
        }
        emptyMessage="No hay pacientes registrados"
        headers={TABLE_HEADER_PATIENTS}
        body={
          <RowPatient
            patients={hook.patientsData}
            handleShowDeleteModal={hook.handleShowDeleteModal}
            handleShowModalDetail={hook.handleShowModalDoctorDetail}
          />
        }
      />
    </>
  );
}

export default PatientsListPage;
