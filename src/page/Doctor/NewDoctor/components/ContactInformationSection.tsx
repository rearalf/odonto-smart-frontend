import { FiMail, FiPhone, FiPlus, FiTrash2 } from 'react-icons/fi';
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

import { Formik, type FormikProps } from 'formik';
import type { IFormValues } from '../types/newDoctor.types';

import {
  RadioButtonComponent,
  TextFieldBasic,
  TextFieldPhone,
} from '@components/index';
import {
  contactInitialValues,
  contactOptions,
  contactSchema,
} from '../validation/newDoctor.schema';

interface IContactInformationSection {
  formikProps: FormikProps<IFormValues>;
}

const ContactInformationSection = ({
  formikProps,
}: IContactInformationSection) => {
  const theme = useTheme();

  return (
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
          Información de Contacto{' '}
          <Typography variant="caption"> (Opcional)</Typography>
        </Typography>
      </Box>

      {/* Add New Contact Form */}
      <Formik
        initialValues={contactInitialValues}
        validationSchema={contactSchema}
        onSubmit={(values, formikHelpers) => {
          const newArray = [...formikProps.values.person.personContact, values];
          formikProps.setFieldValue('person.personContact', newArray);
          formikHelpers.resetForm();
          formikHelpers.setSubmitting(true);
        }}
      >
        {(formik) => (
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
              }}
            >
              Agregar nuevo contacto
            </Typography>

            <RadioButtonComponent
              id="conact_values"
              value={formik.values.contact_type}
              onChange={(e) => {
                formik.setFieldValue('contact_type', e);
                formik.setFieldValue('contact_value', '');
                formik.setFieldError('contact_value', undefined);
                formik.setFieldTouched('contact_value', false, false);
              }}
              options={contactOptions}
              sx={{ mb: 2.5 }}
            />

            {/* Contact Value Input */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                {formik.values.contact_type === 'EMAIL' ? (
                  <TextFieldBasic
                    id="email"
                    type="email"
                    label="Correo"
                    autoComplete="email"
                    placeholder="doctor@clinica.com"
                    value={formik.values.contact_value}
                    onChange={(e) => {
                      formik.setFieldValue('contact_value', e.target.value);
                    }}
                    handleOnBlur={() => {
                      formik.setFieldTouched('contact_value', true);
                      formik.validateField('contact_value');
                    }}
                    helperText={
                      formik.touched.contact_value &&
                      formik.errors.contact_value
                        ? formik.errors.contact_value
                        : ''
                    }
                    error={
                      formik.touched.contact_value &&
                      Boolean(formik.errors.contact_value)
                    }
                  />
                ) : (
                  <TextFieldPhone
                    id="contact_value"
                    label={
                      formik.values.contact_type === 'PHONE'
                        ? 'Teléfono'
                        : 'WhatsApp'
                    }
                    value={formik.values.contact_value}
                    onChange={(e) => {
                      formik.setFieldValue('contact_value', e);
                    }}
                    handleOnBlur={() => {
                      formik.setFieldTouched('contact_value', true);
                      formik.validateField('contact_value');
                    }}
                    helperText={
                      formik.touched.contact_value &&
                      formik.errors.contact_value
                        ? formik.errors.contact_value
                        : ''
                    }
                    error={
                      formik.touched.contact_value &&
                      Boolean(formik.errors.contact_value)
                    }
                  />
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!formik.isValid || !formik.dirty}
                  startIcon={<FiPlus />}
                  type="submit"
                  onClick={formik.submitForm}
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
        )}
      </Formik>
      {/* Contact List Display */}
      {formikProps.values.person.personContact.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {formikProps.values.person.personContact.map((contact, index) => (
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
                        <FiMail size={20} color={theme.palette.info.main} />
                      ) : (
                        <FiPhone size={20} color={theme.palette.success.main} />
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
                          ...formikProps.values.person.personContact,
                        ];
                        newContacts.splice(index, 1);
                        formikProps.setFieldValue(
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
  );
};

export default ContactInformationSection;
