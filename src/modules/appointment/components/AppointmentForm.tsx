import type { PickerValue } from '@mui/x-date-pickers/internals';
import { useFormikContext } from 'formik';
import { Grid } from '@mui/material';

import {
  DatePickerComponent,
  SelectComponent,
  TextFieldBasic,
  TimePickerComponent,
} from '@components/index';
import type { ISelectOptions } from '@type/common.types';
import type { IAppointmentInstant } from '../types/index.types';
import { MODULES } from '@config/modules';

interface IAppointmentFormProps {
  doctorsList: ISelectOptions[];
  disabled_appointment_date: boolean;
  disabled_start_time: boolean;
  disabled_end_time: boolean;
}

const AppointmentForm = (props: IAppointmentFormProps) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    validateField,
    setFieldTouched,
  } = useFormikContext<IAppointmentInstant>();
  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      {MODULES.DOCTORS && (
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <SelectComponent
            id="doctor_id"
            label="Doctor"
            disabled={isSubmitting}
            required={MODULES.DOCTORS}
            options={props.doctorsList}
            value={values.doctor_id || ''}
            helperText={touched.doctor_id ? errors.doctor_id : undefined}
            error={touched.doctor_id ? Boolean(errors.doctor_id) : undefined}
            onChange={(e) =>
              setFieldValue('doctor_id', parseInt(e.target.value, 10))
            }
            handleOnBlur={() => {
              validateField('doctor_id');
              setFieldTouched('doctor_id', true);
            }}
          />
        </Grid>
      )}

      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <DatePickerComponent
          required
          id="appointment_date"
          label="Fecha de la cita"
          value={values.appointment_date}
          disabled={isSubmitting || props.disabled_appointment_date}
          onChange={(newValue) => setFieldValue('appointment_date', newValue)}
          helperText={
            touched.appointment_date ? errors.appointment_date : undefined
          }
          error={
            touched.appointment_date ? Boolean(errors.appointment_date) : false
          }
          handleOnBlur={() => {
            validateField('appointment_date');
            setFieldTouched('appointment_date', true);
          }}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 2,
        }}
      >
        <TimePickerComponent
          required
          minutesStep={30}
          id="start_time"
          label="Hora de la cita"
          value={values.start_time}
          disabled={isSubmitting || props.disabled_start_time}
          helperText={touched.start_time ? errors.start_time : undefined}
          error={errors.end_time ? Boolean(errors.start_time) : undefined}
          onChange={(newValue: PickerValue) =>
            setFieldValue('start_time', newValue)
          }
          handleOnBlur={() => {
            validateField('start_time');
            setFieldTouched('start_time', true);
          }}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 2,
        }}
      >
        <TimePickerComponent
          minutesStep={30}
          id="end_time"
          label="Hora fin de la cita"
          value={values.end_time}
          disabled={isSubmitting || props.disabled_end_time}
          helperText={touched.end_time ? errors.end_time : undefined}
          error={touched.end_time ? Boolean(errors.end_time) : undefined}
          onChange={(newValue: PickerValue) =>
            setFieldValue('end_time', newValue)
          }
          handleOnBlur={() => {
            validateField('end_time');
            setFieldTouched('end_time', true);
          }}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <TextFieldBasic
          required
          multiline
          type="text"
          id="reason"
          label="Razón de la cita"
          ariaLabel="Razón de la cita"
          placeholder="Ejemplo: Dolor de muelas, chequeo anual..."
          value={values.reason}
          disabled={isSubmitting}
          helperText={touched.reason ? errors.reason : undefined}
          error={touched.reason ? Boolean(errors.reason) : undefined}
          onChange={(e) => setFieldValue('reason', e.target.value)}
          handleOnBlur={() => {
            validateField('reason');
            setFieldTouched('reason', true);
          }}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <TextFieldBasic
          multiline
          type="text"
          id="notes"
          label="Notas"
          ariaLabel="Notas"
          placeholder="Ejemplo: Paciente con antecedentes de hipertensión."
          disabled={isSubmitting}
          value={values.notes || ''}
          helperText={touched.notes ? errors.notes : undefined}
          error={touched.notes ? Boolean(errors.notes) : undefined}
          onChange={(e) => setFieldValue('notes', e.target.value)}
          handleOnBlur={() => {
            validateField('notes');
            setFieldTouched('notes', true);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AppointmentForm;
