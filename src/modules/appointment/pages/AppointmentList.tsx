import { Box, Typography } from '@mui/material';

import {
  BreadCrumbs,
  ButtonComponent,
  TableComponent,
} from '@components/index';
import {
  BREADCRUMBSAPPOINTMENTLIST,
  TABLE_HEADER_APPOINTMENTS,
} from '../constants/index.const';
import { headerStyles } from '@styles/index';
import { FaPlus } from 'react-icons/fa';

function AppointmentList() {
  return (
    <>
      <BreadCrumbs links={BREADCRUMBSAPPOINTMENTLIST} loading={false} />

      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          Gestión de citas
        </Typography>
        <ButtonComponent
          type="button"
          color="primary"
          position="left"
          text="Nueva cita"
          icon={<FaPlus />}
          variant="contained"
          onClick={() => {}}
        />
      </Box>

      <TableComponent
        pagination
        key="appointments"
        ariaLabelTable="Citas"
        handleSetPage={() => {}}
        handleSetRowsPerPage={() => {}}
        page={1}
        loading={false}
        rowsPerPage={10}
        totalData={0}
        emptyMessage="No hay citas registradas"
        headers={TABLE_HEADER_APPOINTMENTS}
        body={<></>}
      />
    </>
  );
}

export default AppointmentList;
