import {
  alpha,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';

import {
  BreadCrumbs,
  RadioButtonComponent,
  SelectComponent,
  TextFieldBasic,
} from '@components/index';
import useNewDoctor from './useNewDoctor';

import {
  contactOptions,
  doctorInitialValues,
  doctorSchemaStepOne,
} from './validation/newDoctor.schema';
import { BREADCRUMBS } from './constants/newDoctor';
import './styles.css';
import {
  FiActivity,
  FiLock,
  FiMail,
  FiPhone,
  FiPlus,
  FiTrash2,
  FiUser,
} from 'react-icons/fi';

function NewDoctor() {
  const hook = useNewDoctor();
  const theme = useTheme();

  return (
    <Box component="div" className="new-doctor">
      <BreadCrumbs links={BREADCRUMBS} loading={false} />

      <header className="header">
        <h1>Nuevo doctor</h1>
      </header>

      <Formik
        initialValues={doctorInitialValues}
        validationSchema={doctorSchemaStepOne}
        onSubmit={(_values, formikHelpers) => formikHelpers.setSubmitting(true)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <>
            <Box component="div" className="form-step-1">
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  Información Personal
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    maxWidth: 600,
                    mx: 'auto',
                  }}
                >
                  Complete los datos personales del profesional médico. Los
                  campos marcados con * son obligatorios.
                </Typography>
              </Box>
            </Box>

            {/* Personal Information Section */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <FiUser
                  size={24}
                  color={theme.palette.primary.main}
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Datos Personales
                </Typography>
              </Box>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextFieldBasic
                    required
                    type="text"
                    placeholder="Juan"
                    label="Primer nombre"
                    id="person.first_name"
                    value={props.values.person.first_name}
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    handleOnBlur={() => {
                      props.validateField('person.first_name');
                      props.setFieldTouched('person.first_name', true);
                    }}
                    helperText={
                      props.touched.person?.first_name &&
                      props.errors.person?.first_name
                        ? props.errors.person?.first_name
                        : ''
                    }
                    error={
                      props.touched.person?.first_name &&
                      Boolean(props.errors.person?.first_name)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextFieldBasic
                    type="text"
                    label="Segundo nombre"
                    id="person.middle_name"
                    placeholder="Carlos (Opcional)"
                    value={props.values.person.middle_name ?? ''}
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    helperText={props.errors.person?.middle_name}
                    error={props.errors.person?.middle_name !== undefined}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextFieldBasic
                    required
                    type="text"
                    label="Apellidos"
                    id="person.last_name"
                    placeholder="Pérez García"
                    value={props.values.person.last_name}
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    handleOnBlur={() => {
                      props.setFieldTouched('person.last_name', true);
                      props.validateField('person.last_name');
                    }}
                    helperText={
                      props.touched.person?.last_name
                        ? props.errors.person?.last_name
                        : ''
                    }
                    error={
                      props.touched.person?.last_name &&
                      Boolean(props.errors.person?.last_name)
                    }
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Contact Information Section */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <FiPhone
                  size={24}
                  color={theme.palette.primary.main}
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Información de Contacto
                </Typography>
              </Box>

              {/* Add New Contact Form */}
              <Box
                sx={{
                  p: 2.5,
                  backgroundColor: alpha(theme.palette.success.main, 0.03),
                  borderRadius: 1.5,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: theme.palette.success.main,
                  }}
                >
                  Agregar nuevo contacto
                </Typography>

                {/* Radio Buttons for Contact Type */}
                {/* <RadioGroup
                  row
                  value={hook.newContactType}
                  onChange={(e) => {
                    hook.setNewContactType(e.target.value);
                    hook.setNewContactValue('');
                  }}
                  sx={{ mb: 2.5 }}
                >
                  <FormControlLabel
                    value="EMAIL"
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: theme.palette.text.secondary,
                          '&.Mui-checked': {
                            color: theme.palette.info.main,
                          },
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <FiMail size={16} />
                        <Typography variant="body2">
                          Correo electrónico
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="PHONE"
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: theme.palette.text.secondary,
                          '&.Mui-checked': {
                            color: theme.palette.success.main,
                          },
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <FiPhone size={16} />
                        <Typography variant="body2">Teléfono</Typography>
                      </Box>
                    }
                  />
                </RadioGroup> */}
                <RadioButtonComponent
                  value={'EMAIL'}
                  onChange={(e) => {
                    // eslint-disable-next-line no-console
                    console.log(e);
                  }}
                  options={contactOptions}
                  sx={{ mb: 2.5 }}
                />

                {/* Contact Value Input */}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <TextFieldBasic
                      type={hook.newContactType === 'EMAIL' ? 'email' : 'tel'}
                      id="new_contact_value"
                      label={
                        hook.newContactType === 'EMAIL'
                          ? 'Correo electrónico'
                          : 'Número de teléfono'
                      }
                      placeholder={
                        hook.newContactType === 'EMAIL'
                          ? 'doctor@clinica.com'
                          : '+1234567890'
                      }
                      value={hook.newContactValue}
                      onChange={(e) => hook.setNewContactValue(e.target.value)}
                      helperText={
                        hook.newContactType === 'EMAIL'
                          ? 'Ingrese un correo válido'
                          : 'Ingrese el número con código de país'
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<FiPlus />}
                      onClick={() => {
                        if (hook.newContactValue.trim()) {
                          const newContact = {
                            contact_type: hook.newContactType,
                            contact_value: hook.newContactValue.trim(),
                          };
                          props.setFieldValue('person.personContact', [
                            ...props.values.person.personContact,
                            newContact,
                          ]);
                          hook.setNewContactValue('');
                        }
                      }}
                      disabled={
                        !hook.newContactValue.trim() || props.isSubmitting
                      }
                      sx={{
                        backgroundColor: theme.palette.success.main,
                        height: '56px',
                        '&:hover': {
                          backgroundColor: theme.palette.success.dark,
                        },
                      }}
                    >
                      Agregar
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {/* Contact List Display */}
              {props.values.person.personContact.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    {props.values.person.personContact.map((contact, index) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 1.5,
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            position: 'relative',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: theme.palette.success.main,
                              boxShadow: `0 2px 8px ${alpha(theme.palette.success.main, 0.15)}`,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 1,
                                backgroundColor: alpha(
                                  contact.contact_type === 'EMAIL'
                                    ? theme.palette.info.main
                                    : theme.palette.success.main,
                                  0.1,
                                ),
                              }}
                            >
                              {contact.contact_type === 'EMAIL' ? (
                                <FiMail
                                  size={20}
                                  color={theme.palette.info.main}
                                />
                              ) : (
                                <FiPhone
                                  size={20}
                                  color={theme.palette.success.main}
                                />
                              )}
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  fontWeight: 500,
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5,
                                }}
                              >
                                {contact.contact_type === 'EMAIL'
                                  ? 'Correo'
                                  : 'Teléfono'}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 500,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {contact.contact_value || 'Sin especificar'}
                              </Typography>
                            </Box>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                const newContacts = [
                                  ...props.values.person.personContact,
                                ];
                                newContacts.splice(index, 1);
                                props.setFieldValue(
                                  'person.personContact',
                                  newContacts,
                                );
                              }}
                              sx={{
                                opacity: 0.7,
                                '&:hover': {
                                  opacity: 1,
                                  backgroundColor: alpha(
                                    theme.palette.error.main,
                                    0.08,
                                  ),
                                },
                              }}
                            >
                              <FiTrash2 size={16} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Paper>

            {/* Account Information Section */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                backgroundColor: alpha(theme.palette.info.main, 0.02),
                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <FiLock
                  size={24}
                  color={theme.palette.info.main}
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Información de Cuenta
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid size={12}>
                  <TextFieldBasic
                    required
                    type="text"
                    id="person.user.email"
                    label="Correo electrónico"
                    autoComplete="email"
                    placeholder="doctor@clinica.com"
                    value={props.values.person.user.email}
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    handleOnBlur={() => {
                      props.setFieldTouched('person.user.email', true);
                      props.validateField('person.user.email');
                    }}
                    helperText={
                      props.touched.person?.user?.email
                        ? props.errors.person?.user?.email
                        : ''
                    }
                    error={
                      props.touched.person?.user?.email &&
                      Boolean(props.errors.person?.user?.email)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextFieldBasic
                    required
                    type="password"
                    label="Contraseña"
                    id="person.user.password"
                    autoComplete="new-password"
                    placeholder="Mínimo 8 caracteres"
                    disabled={props.isSubmitting}
                    value={props.values.person.user.password}
                    onChange={props.handleChange}
                    showPassword={hook.isShowPassword}
                    handleShowPassword={hook.handleShowPassword}
                    handleOnBlur={() => {
                      props.setFieldTouched('person.user.password', true);
                      props.validateField('person.user.password');
                    }}
                    helperText={
                      props.touched.person?.user?.password
                        ? props.errors.person?.user?.password
                        : 'Use mayúsculas, minúsculas, números y símbolos'
                    }
                    error={
                      props.touched.person?.user?.password &&
                      Boolean(props.errors.person?.user?.password)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextFieldBasic
                    required
                    type="password"
                    autoComplete="new-password"
                    label="Confirmar contraseña"
                    id="person.user.confirmPassword"
                    placeholder="Repita la contraseña"
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    value={props.values.person.user.confirmPassword}
                    showPassword={hook.isShowConfirmPassword}
                    handleShowPassword={hook.handleShowConfirmPassword}
                    handleOnBlur={() => {
                      props.setFieldTouched(
                        'person.user.confirmPassword',
                        true,
                      );
                      props.validateField('person.user.confirmPassword');
                    }}
                    helperText={
                      props.touched.person?.user?.confirmPassword
                        ? props.errors.person?.user?.confirmPassword
                        : ''
                    }
                    error={
                      props.touched.person?.user?.confirmPassword &&
                      Boolean(props.errors.person?.user?.confirmPassword)
                    }
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Professional Information Section */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <FiActivity
                  size={24}
                  color={theme.palette.primary.main}
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Información Profesional
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SelectComponent
                    required
                    id="specialty_id"
                    label="Especialidad médica"
                    ariaLabel="Especialidad"
                    options={hook.specialties}
                    value={props.values.specialty_id}
                    onChange={props.handleChange}
                    handleOnBlur={() => {
                      props.setFieldTouched('specialty_id', true);
                      props.validateField('specialty_id');
                    }}
                    helperText={
                      props.touched.specialty_id
                        ? props.errors.specialty_id
                        : 'Seleccione la especialidad principal'
                    }
                    error={
                      props.touched.specialty_id &&
                      Boolean(props.errors.specialty_id)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextFieldBasic
                    multiline
                    type="text"
                    id="qualification"
                    key="Cualificación académica"
                    label="Cualificación académica"
                    placeholder="Describa su formación académica, certificaciones y experiencia profesional..."
                    onChange={props.handleChange}
                    value={props.values.qualification}
                    handleOnBlur={() => {
                      props.setFieldTouched('qualification', true);
                      props.validateField('qualification');
                    }}
                    helperText={
                      props.errors.qualification ||
                      'Opcional: Incluya títulos, universidades, años de experiencia, etc.'
                    }
                    error={props.errors.qualification !== undefined}
                  />
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Formik>
    </Box>
  );
}

export default NewDoctor;
