import { FaHeartbeat, FaPlus } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

import { BreadCrumbs, ButtonComponent } from '@components/index';

import { BREADCRUMBS } from '../constants/patientsList.const';
import useStyles from '../hooks/useStyles';
import usePatientsListPage from '../hooks/usePatientsListPage';

function PatientsListPage() {
  const hook = usePatientsListPage();
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
    </>
  );
}

export default PatientsListPage;
