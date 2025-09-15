import type { PickerValue } from '@mui/x-date-pickers/internals';
import { Box, Typography } from '@mui/material';
import { Formik } from 'formik';

import { BreadCrumbs } from '@components/index';
import { headerStyles } from '@styles/index';

import { newInstantAppointmentSchema } from '../validation/newInstantAppointment.schema';
import {
  BREADCRUMBSNEWINSTANTAPPOINTMENT,
  INITIAL_VALUES_NEW_INSTANT_APPOINTMENT,
} from '../constants/index.const';
import useNewInstantAppoinment from '../hooks/useNewInstantAppoinment';
import AffectationForm from '../components/AffectationForm';
import AppointmentForm from '../components/AppointmentForm';
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

      <Formik
        initialValues={INITIAL_VALUES_NEW_INSTANT_APPOINTMENT}
        validationSchema={newInstantAppointmentSchema}
        onSubmit={() => {}}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props) => (
          <>
            <AppointmentForm
              appointment_date={{
                id: 'appointment_date',
                value: props.values.appointment_date,
                disabled: true,
                handleChange: () => {},
                handleOnBlur: () => {},
                helperText: props.touched.appointment_date
                  ? props.errors.appointment_date
                  : undefined,
                error: false,
              }}
              end_time={{
                id: 'end_time',
                value: props.values.end_time,
                disabled: false,
                handleChange: (newValue: PickerValue) => {
                  props.setFieldValue('end_time', newValue);
                },
                handleOnBlur: () => {
                  props.validateField('end_time');
                  props.setFieldTouched('end_time', true);
                },
                helperText: props.touched.end_time
                  ? props.errors.end_time
                  : undefined,
                error: props.touched.end_time
                  ? Boolean(props.errors.end_time)
                  : undefined,
              }}
              start_time={{
                id: 'start_time',
                value: props.values.start_time,
                disabled: false,
                handleChange: (newValue: PickerValue) => {
                  props.setFieldValue('start_time', newValue);
                },
                handleOnBlur: () => {
                  props.validateField('start_time');
                  props.setFieldTouched('start_time', true);
                },
                helperText: props.touched.start_time
                  ? props.errors.start_time
                  : undefined,
                error: props.touched.start_time
                  ? Boolean(props.errors.start_time)
                  : undefined,
              }}
              reason={{
                id: 'reason',
                value: props.values.reason,
                disabled: false,
                handleChange: (e) => {
                  props.setFieldValue('reason', e.target.value);
                },
                handleOnBlur: () => {
                  props.validateField('reason');
                  props.setFieldTouched('reason', true);
                },
                helperText: props.touched.reason
                  ? props.errors.reason
                  : undefined,
                error: props.touched.reason
                  ? Boolean(props.errors.reason)
                  : undefined,
              }}
              notes={{
                id: 'notes',
                value: props.values.notes || '',
                disabled: false,
                handleChange: (e) => {
                  props.setFieldValue('notes', e.target.value);
                },
                handleOnBlur: () => {
                  props.validateField('notes');
                  props.setFieldTouched('notes', true);
                },
                helperText: props.touched.notes
                  ? props.errors.notes
                  : undefined,
                error: props.touched.notes
                  ? Boolean(props.errors.notes)
                  : undefined,
              }}
            />
          </>
        )}
      </Formik>

      <AffectationForm />

      <Odontogram
        odontogramData={odontogramData}
        handleToothClick={handleToothClick}
      />
    </>
  );
}

export default NewInstantAppointment;
