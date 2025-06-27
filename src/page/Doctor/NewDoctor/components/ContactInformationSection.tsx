import { Box, Grid, Paper, Typography } from '@mui/material';
import { Formik, type FormikProps } from 'formik';
import { FiPhone, FiPlus } from 'react-icons/fi';

import {
  ButtonComponent,
  RadioButtonComponent,
  TextFieldBasic,
  TextFieldPhone,
} from '@components/index';
import { contactSchema } from '../validation/newDoctor.schema';
import type { IFormValues } from '../types/newDoctor.types';
import useStyles from '../hook/useStyles';
import ContactCard from './ContactCard';
import {
  CONTACT_OPTIONS,
  CONTACT_INITIAL_VALUES,
} from '../constants/newDoctor';

interface IContactInformationSection {
  formikProps: FormikProps<IFormValues>;
}

const ContactInformationSection = ({
  formikProps,
}: IContactInformationSection) => {
  const styles = useStyles();

  return (
    <Paper elevation={0} sx={styles.paperStyles}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <FiPhone
          size={24}
          color={styles.theme.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Información de Contacto
          <Typography variant="caption"> (Opcional)</Typography>
        </Typography>
      </Box>

      {/* Add New Contact Form */}
      <Formik
        initialValues={CONTACT_INITIAL_VALUES}
        validationSchema={contactSchema}
        onSubmit={(values, formikHelpers) => {
          const newArray = [...formikProps.values.person.personContact, values];
          formikProps.setFieldValue('person.personContact', newArray);
          formikHelpers.resetForm();
          formikHelpers.setSubmitting(true);
        }}
      >
        {(formik) => (
          <>
            <Box sx={styles.boxContactFormStyles}>
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
                options={CONTACT_OPTIONS}
                sx={{ mb: 2.5 }}
                disabled={formikProps.isSubmitting}
              />

              {/* Contact Value Input */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                  {formik.values.contact_type === 'EMAIL' ? (
                    <TextFieldBasic
                      id="email"
                      type="email"
                      label="Correo"
                      inputMode="email"
                      ariaLabel="Correo"
                      autoComplete="email"
                      placeholder="doctor@clinica.com"
                      value={formik.values.contact_value}
                      disabled={formikProps.isSubmitting}
                      onSubmit={formik.submitForm}
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
                      onSubmit={formik.submitForm}
                      label={
                        formik.values.contact_type === 'PHONE'
                          ? 'Teléfono'
                          : 'WhatsApp'
                      }
                      value={formik.values.contact_value}
                      disabled={formikProps.isSubmitting}
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
                  <ButtonComponent
                    fullWidth
                    type="button"
                    color="primary"
                    position="left"
                    text="Agregar"
                    variant="contained"
                    icon={<FiPlus />}
                    onClick={formik.submitForm}
                    disabled={
                      !formik.isValid ||
                      !formik.dirty ||
                      formikProps.isSubmitting
                    }
                    sx={{
                      backgroundColor: styles.theme.palette.success.main,
                      height: '100%',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: styles.theme.palette.success.dark,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Formik>
      {/* Contact List Display */}
      {formikProps.values.person.personContact.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {formikProps.values.person.personContact.map((contact, index) => (
              <ContactCard
                key={index}
                index={index}
                contact={contact}
                formikProps={formikProps}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default ContactInformationSection;
