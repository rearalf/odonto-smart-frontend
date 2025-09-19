import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import { BreadCrumbs, ButtonsGroupForm } from '@components/index';
import { headerStyles } from '@styles/index';

import { newInstantAppointmentSchema } from '../validation/newInstantAppointment.schema';
import {
  BREADCRUMBSNEWINSTANTAPPOINTMENT,
  INITIAL_VALUES_NEW_INSTANT_APPOINTMENT,
} from '../constants/index.const';
import useNewInstantAppoinment from '../hooks/useNewInstantAppoinment';

import AppointmentForm from '../components/AppointmentForm';
import CompleteOdontogram from '@modules/odontogram/View/CompleteOdontogram';

function NewInstantAppointment() {
  const { patientId, doctorsList, backendModifiedTeeth } =
    useNewInstantAppoinment();
  return (
    <>
      <BreadCrumbs links={BREADCRUMBSNEWINSTANTAPPOINTMENT} loading={false} />

      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          Nuevo cita
        </Typography>
      </Box>

      <Formik
        initialValues={{
          ...INITIAL_VALUES_NEW_INSTANT_APPOINTMENT,
          patient_id: patientId ? parseInt(patientId, 10) : 0,
        }}
        validationSchema={newInstantAppointmentSchema}
        onSubmit={() => {}}
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

          <CompleteOdontogram backendModifiedTeeth={backendModifiedTeeth} />

          <ButtonsGroupForm />
        </Form>
      </Formik>
    </>
  );
}

export default NewInstantAppointment;
