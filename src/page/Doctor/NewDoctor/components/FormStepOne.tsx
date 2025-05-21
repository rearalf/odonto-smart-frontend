import { SelectComponent, TextFieldBasic } from '@components/index';
import { INewDoctorFormValues } from '../types/newDoctor.types';

import { Box } from '@mui/material';
import { FormikProps } from 'formik';

interface IFormStepOneProps {
  isShowPassword: boolean;
  isShowConfirmPassword: boolean;
  specialties: IBasicIdNameDescription[];
  formikProps: FormikProps<INewDoctorFormValues>;
  handleShowPassword: () => void;
  handleShowConfirmPassword: () => void;
}

const FormStepOne = (props: IFormStepOneProps) => {
  return (
    <Box component="div" className="form-step-1">
      <TextFieldBasic
        required
        type="text"
        id="first_name"
        label="Primer nombre"
        value={props.formikProps.values.first_name}
        disabled={props.formikProps.isSubmitting}
        onChange={props.formikProps.handleChange}
        handleOnBlur={() => {
          props.formikProps.setFieldTouched('first_name', true);
          props.formikProps.validateField('first_name');
        }}
        helperText={
          props.formikProps.touched.first_name &&
          props.formikProps.errors.first_name
            ? props.formikProps.errors.first_name
            : ''
        }
        error={
          props.formikProps.touched.first_name &&
          Boolean(props.formikProps.errors.first_name)
        }
      />

      <TextFieldBasic
        type="text"
        id="middle_name"
        label="Segundo nombre"
        value={props.formikProps.values.middle_name}
        disabled={props.formikProps.isSubmitting}
        onChange={props.formikProps.handleChange}
        helperText={props.formikProps.errors.middle_name}
        error={props.formikProps.errors.middle_name !== undefined}
      />

      <TextFieldBasic
        required
        type="text"
        id="last_name"
        label="Apellidos"
        value={props.formikProps.values.last_name}
        disabled={props.formikProps.isSubmitting}
        onChange={props.formikProps.handleChange}
        handleOnBlur={() => {
          props.formikProps.setFieldTouched('last_name', true);
          props.formikProps.validateField('last_name');
        }}
        helperText={
          props.formikProps.touched.last_name
            ? props.formikProps.errors.last_name
            : ''
        }
        error={
          props.formikProps.touched.last_name &&
          Boolean(props.formikProps.errors.last_name)
        }
      />

      <TextFieldBasic
        required
        id="email"
        type="text"
        label="Correo"
        autoComplete="email"
        placeholder="correo@gmail.com"
        value={props.formikProps.values.email}
        disabled={props.formikProps.isSubmitting}
        onChange={props.formikProps.handleChange}
        handleOnBlur={() => {
          props.formikProps.setFieldTouched('email', true);
          props.formikProps.validateField('email');
        }}
        helperText={
          props.formikProps.touched.email ? props.formikProps.errors.email : ''
        }
        error={
          props.formikProps.touched.email &&
          Boolean(props.formikProps.errors.email)
        }
      />

      <TextFieldBasic
        required
        id="password"
        type="password"
        label="Contraseña"
        autoComplete="new-password"
        disabled={props.formikProps.isSubmitting}
        value={props.formikProps.values.password}
        onChange={props.formikProps.handleChange}
        showPassword={props.isShowPassword}
        handleShowPassword={props.handleShowPassword}
        handleOnBlur={() => {
          props.formikProps.setFieldTouched('password', true);
          props.formikProps.validateField('password');
        }}
        helperText={
          props.formikProps.touched.password
            ? props.formikProps.errors.password
            : ''
        }
        error={
          props.formikProps.touched.password &&
          Boolean(props.formikProps.errors.password)
        }
      />

      <TextFieldBasic
        required
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
        label="Confirmar contraseña"
        disabled={props.formikProps.isSubmitting}
        onChange={props.formikProps.handleChange}
        value={props.formikProps.values.confirmPassword}
        showPassword={props.isShowConfirmPassword}
        handleShowPassword={props.handleShowConfirmPassword}
        handleOnBlur={() => {
          props.formikProps.setFieldTouched('confirmPassword', true);
          props.formikProps.validateField('confirmPassword');
        }}
        helperText={
          props.formikProps.touched.confirmPassword
            ? props.formikProps.errors.confirmPassword
            : ''
        }
        error={
          props.formikProps.touched.confirmPassword &&
          Boolean(props.formikProps.errors.confirmPassword)
        }
      />

      <SelectComponent
        required
        id="specialty"
        label="Especialidad"
        ariaLabel="Especialidad"
        options={props.specialties}
        value={props.formikProps.values.specialty}
        onChange={props.formikProps.handleChange}
        handleOnBlur={() => {
          props.formikProps.setFieldTouched('specialty', true);
          props.formikProps.validateField('specialty');
        }}
        helperText={
          props.formikProps.touched.specialty
            ? props.formikProps.errors.specialty
            : ''
        }
        error={
          props.formikProps.touched.specialty &&
          Boolean(props.formikProps.errors.specialty)
        }
      />

      <TextFieldBasic
        multiline
        type="text"
        id="qualification"
        key="Cualificación académica"
        label="Cualificación académica"
        onChange={props.formikProps.handleChange}
        value={props.formikProps.values.qualification}
        helperText={props.formikProps.errors.qualification}
        error={props.formikProps.errors.qualification !== undefined}
      />
    </Box>
  );
};

export default FormStepOne;
