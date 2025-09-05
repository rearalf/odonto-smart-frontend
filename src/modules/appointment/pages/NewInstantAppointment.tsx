import { Box, Grid, Typography } from '@mui/material';

import { BreadCrumbs } from '@components/index';
import { headerStyles } from '@styles/index';

import { BREADCRUMBSNEWINSTANTAPPOINTMENT } from '../constants/index.const';
import AffectationForm from '../components/AffectationForm';
import Tooth from '../components/Tooth';
import { newInstantAppointmentStyles } from '../styles/styles';
import useNewInstantAppoinment from '../hooks/useNewInstantAppoinment';

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

      <Grid
        container
        spacing={3}
        sx={newInstantAppointmentStyles.teethContainer}
      >
        <Grid sx={newInstantAppointmentStyles.rowContainer}>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={1}>
            {odontogramData.permanent['1'].map((tooth) => (
              <Tooth
                toothData={tooth}
                key={tooth.tooth_number}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={2}>
            {odontogramData.permanent['2'].map((tooth) => (
              <Tooth
                key={tooth.tooth_number}
                toothData={tooth}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
        </Grid>

        <Grid sx={newInstantAppointmentStyles.rowContainer}>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={5}>
            {odontogramData.temporary['5'].map((tooth) => (
              <Tooth
                key={tooth.tooth_number}
                toothData={tooth}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={6}>
            {odontogramData.temporary['6'].map((tooth) => (
              <Tooth
                key={tooth.tooth_number}
                toothData={tooth}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
        </Grid>

        <Grid sx={newInstantAppointmentStyles.rowContainer}>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={8}>
            {odontogramData.temporary['8'].map((tooth) => (
              <Tooth
                key={tooth.tooth_number}
                toothData={tooth}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={7}>
            {odontogramData.temporary['7'].map((tooth) => (
              <Tooth
                key={tooth.tooth_number}
                toothData={tooth}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
        </Grid>

        <Grid sx={newInstantAppointmentStyles.rowContainer}>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={3}>
            {odontogramData.permanent['3'].map((tooth) => (
              <Tooth
                key={tooth.tooth_number}
                toothData={tooth}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
          <Grid sx={newInstantAppointmentStyles.roowToothContainer} key={4}>
            {odontogramData.permanent['4'].map((tooth) => (
              <Tooth
                key={tooth.tooth_number}
                toothData={tooth}
                handleToothInvolvement={handleToothClick}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default NewInstantAppointment;
