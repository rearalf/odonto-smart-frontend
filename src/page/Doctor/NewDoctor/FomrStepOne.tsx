import { SelectComponent, TextFieldBasic } from '@components/index';

import { Box } from '@mui/material';
import { FormikProps } from 'formik';

interface IFomrStepOneProps {
  isShowPassword: boolean;
  isShowConfirmPassword: boolean;
  specialties: IBasicIdNameDescrip[];
  formikProps: FormikProps<{
    first_name: string;
    middle_name: string;
    last_name: string;
    qualification: string;
    email: string;
    password: string;
    confirmPassword: string;
    specialty: string;
  }>;
  handleShowPassword: () => void;
  handleShowConfirmPassword: () => void;
}

const FomrStepOne = (props: IFomrStepOneProps) => {
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
          props.formikProps.touched.first_name
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
        helperText={props.formikProps.errors.last_name}
        error={props.formikProps.errors.last_name !== undefined}
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
        helperText={props.formikProps.errors.password}
        error={props.formikProps.errors.password !== undefined}
        handleShowPassword={props.handleShowPassword}
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
        helperText={props.formikProps.errors.confirmPassword}
        error={props.formikProps.errors.confirmPassword !== undefined}
        handleShowPassword={props.handleShowConfirmPassword}
      />

      <SelectComponent
        required
        id="specialty"
        label="Especialidad"
        ariaLabel="Especialidad"
        options={props.specialties}
        value={props.formikProps.values.specialty}
        onChange={props.formikProps.handleChange}
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

export default FomrStepOne;
