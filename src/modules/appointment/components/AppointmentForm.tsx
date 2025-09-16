import type { PickerValue } from '@mui/x-date-pickers/internals';
import type { ChangeEvent } from 'react';
import { Grid } from '@mui/material';
import type {
  DateValidationError,
  TimeValidationError,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers/models';

import {
  DatePickerComponent,
  SelectComponent,
  TextFieldBasic,
  TimePickerComponent,
} from '@components/index';
import type { IBasicIdNameDescription } from '@type/common.types';

interface IAppointmentFormProps {
  doctorsList: IBasicIdNameDescription[];
  doctor: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: number | '';
    disabled: boolean;
    handleOnBlur: () => void;
    helperText: string | undefined;
    error: boolean | undefined;
  };
  appointment_date: {
    id: string;
    value: PickerValue | null;
    disabled: boolean;
    handleChange: (
      newValue: PickerValue,
      context: PickerChangeHandlerContext<DateValidationError>,
    ) => void;
    handleOnBlur: () => void;
    helperText: string | undefined;
    error: boolean | undefined;
  };
  start_time: {
    id: string;
    value: PickerValue | null;
    disabled: boolean;
    handleChange: (
      value: PickerValue,
      context: PickerChangeHandlerContext<TimeValidationError>,
    ) => void;
    handleOnBlur: () => void;
    helperText: string | undefined;
    error: boolean | undefined;
  };
  end_time: {
    id: string;
    value: PickerValue | null;
    disabled: boolean;
    handleChange: (
      newValue: PickerValue,
      context: PickerChangeHandlerContext<TimeValidationError>,
    ) => void;
    handleOnBlur: () => void;
    helperText: string | undefined;
    error: boolean | undefined;
  };
  reason: {
    id: string;
    value: string;
    disabled: boolean;
    handleChange: (newValue: ChangeEvent<HTMLInputElement>) => void;
    handleOnBlur: () => void;
    helperText: string | undefined;
    error: boolean | undefined;
  };
  notes: {
    id: string;
    value: string | null;
    disabled: boolean;
    handleChange: (newValue: ChangeEvent<HTMLInputElement>) => void;
    handleOnBlur: () => void;
    helperText: string | undefined;
    error: boolean | undefined;
  };
}

const AppointmentForm = (props: IAppointmentFormProps) => {
  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <SelectComponent
          required
          id="doctor"
          label="Doctor"
          onChange={props.doctor.onChange}
          options={props.doctorsList}
          value={props.doctor.value}
          helperText={props.doctor.helperText}
          error={props.doctor.error}
          disabled={props.doctor.disabled}
          handleOnBlur={props.doctor.handleOnBlur}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <DatePickerComponent
          required
          id={props.appointment_date.id}
          value={props.appointment_date.value}
          error={props.appointment_date.error}
          label="Fecha de la cita"
          onChange={props.appointment_date.handleChange}
          helperText={props.appointment_date.helperText}
          handleOnBlur={props.appointment_date.handleOnBlur}
          disabled={props.appointment_date.disabled}
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
          id={props.start_time.id}
          label="Hora de la cita"
          value={props.start_time.value}
          error={props.start_time.error}
          onChange={props.start_time.handleChange}
          helperText={props.start_time.helperText}
          handleOnBlur={props.start_time.handleOnBlur}
          disabled={props.start_time.disabled}
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
          id={props.end_time.id}
          label="Hora fin de la cita"
          value={props.end_time.value}
          error={props.end_time.error}
          onChange={props.end_time.handleChange}
          helperText={props.end_time.helperText}
          handleOnBlur={props.end_time.handleOnBlur}
          disabled={props.end_time.disabled}
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
          id={props.reason.id}
          label="Razón de la cita"
          ariaLabel="Razón de la cita"
          placeholder="Ejemplo: Dolor de muelas, chequeo anual..."
          onChange={props.reason.handleChange}
          value={props.reason.value}
          disabled={props.reason.disabled}
          handleOnBlur={props.reason.handleOnBlur}
          helperText={props.reason.helperText}
          error={props.reason.error}
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
          id={props.notes.id}
          label="Notas"
          ariaLabel="Notas"
          placeholder="Ejemplo: Paciente con antecedentes de hipertensión."
          onChange={props.notes.handleChange}
          value={props.notes.value || ''}
          disabled={props.notes.disabled}
          handleOnBlur={props.notes.handleOnBlur}
          helperText={props.notes.helperText}
          error={props.notes.error}
        />
      </Grid>
    </Grid>
  );
};

export default AppointmentForm;
