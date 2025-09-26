import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import {
  BreadCrumbs,
  ButtonComponent,
  ButtonsGroupForm,
} from '@components/index';
import { headerStyles } from '@styles/index';

import { newInstantAppointmentSchema } from '../validation/newInstantAppointment.schema';
import {
  BREADCRUMBSNEWINSTANTAPPOINTMENT,
  INITIAL_VALUES_NEW_INSTANT_APPOINTMENT,
} from '../constants/index.const';
import useNewInstantAppoinment from '../hooks/useNewInstantAppoinment';

import AppointmentForm from '../components/AppointmentForm';
import OdontogramWithForm from '@modules/odontogram/View/OdontogramWithForm';
import DialogPatient from '@modules/patients/components/DialogPatient';
import { MODULES } from '@config/modules';

function NewInstantAppointment() {
  const {
    patientId,
    doctorsList,
    patientData,
    patientDialog,
    patientIsLoading,
    handleSave,
    handleOpenPatientDialog,
  } = useNewInstantAppoinment();
  return (
    <>
      <BreadCrumbs links={BREADCRUMBSNEWINSTANTAPPOINTMENT} loading={false} />

      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          Nuevo cita
        </Typography>
      </Box>

      {patientData && !patientIsLoading && (
        <Box
          sx={{
            mb: 4,
            gap: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="h2">
            {'Paciente: ' + patientData.fullName}
          </Typography>
          <ButtonComponent
            text="Saber más"
            variant="contained"
            onClick={handleOpenPatientDialog}
          />
        </Box>
      )}

      <Formik
        initialValues={{
          ...INITIAL_VALUES_NEW_INSTANT_APPOINTMENT,
          patient_id: patientId ? parseInt(patientId, 10) : 0,
        }}
        validationSchema={newInstantAppointmentSchema}
        onSubmit={handleSave}
        validateOnChange={true}
        validateOnBlur={true}
      >
        <Form>
          <AppointmentForm
            doctorsList={doctorsList}
            disabled_appointment_date={true}
            disabled_start_time={true}
            disabled_end_time={true}
          />

          {MODULES.ODONTOGRAM && <OdontogramWithForm />}

          <ButtonsGroupForm />
        </Form>
      </Formik>

      {patientData && !patientIsLoading && (
        <DialogPatient
          showDialog={patientDialog}
          patient={patientData}
          handleClose={handleOpenPatientDialog}
        />
      )}
    </>
  );
}

export default NewInstantAppointment;
