import { Box, Typography } from '@mui/material';

import { BreadCrumbs } from '@components/index';
import { headerStyles } from '@styles/index';

import { BREADCRUMBSNEWINSTANTAPPOINTMENT } from '../constants/index.const';
import AffectationForm from '../components/AffectationForm';

import useNewInstantAppoinment from '../hooks/useNewInstantAppoinment';
import Odontogram from '../components/Odontogram';

function NewInstantAppointment() {
  const { odontogramData, handleToothClick } = useNewInstantAppoinment();
  return (
    <>
      <BreadCrumbs links={BREADCRUMBSNEWINSTANTAPPOINTMENT} loading={false} />

      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          Nuevo cita
        </Typography>
      </Box>

      <AffectationForm />

      <Odontogram
        odontogramData={odontogramData}
        handleToothClick={handleToothClick}
      />
    </>
  );
}

export default NewInstantAppointment;
