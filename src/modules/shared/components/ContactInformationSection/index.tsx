import { Formik, type FormikHelpers } from 'formik';
import { Box, Grid, Paper, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { FiPhone, FiPlus } from 'react-icons/fi';

import { type IContactForm } from '@type/common.types';
import { paperStylesBase } from '@styles/index';
import {
  CONTACT_INITIAL_VALUES,
  CONTACT_OPTIONS,
  CONTACT_SCHEMA,
} from '@utils/constants';
import {
  TextFieldPhone,
  TextFieldBasic,
  ButtonComponent,
  RadioButtonComponent,
} from '@components/index';
import ContactCard from './ContactCard';

interface IContactInformationSectionProps {
  themeStyle: Theme;
  isSubmitting: boolean;
  personContact: IContactForm[];
  handleSetFieldValue: (field: string, value: any) => void;
}

const ContactInformationSection = (props: IContactInformationSectionProps) => {
  const handleOnSubmit = (
    values: IContactForm,
    formikHelpers: FormikHelpers<IContactForm>,
  ) => {
    const newArray = [...props.personContact, values];
    props.handleSetFieldValue('personContact', newArray);
    formikHelpers.resetForm();
    formikHelpers.setSubmitting(true);
  };

  return (
    <Paper
      elevation={0}
      sx={paperStylesBase(
        props.themeStyle.palette.primary.main,
        props.themeStyle.palette.primary.main,
      )}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <FiPhone
          size={24}
          color={props.themeStyle.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Información de Contacto
          <Typography variant="caption"> (Opcional)</Typography>
        </Typography>
      </Box>

      <Formik
        onSubmit={handleOnSubmit}
        validationSchema={CONTACT_SCHEMA}
        initialValues={CONTACT_INITIAL_VALUES}
      >
        {(formik) => (
          <>
            <Box
              sx={paperStylesBase(
                props.themeStyle.palette.background.paper,
                props.themeStyle.palette.divider,
              )}
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
                options={CONTACT_OPTIONS}
                sx={{ mb: 2.5 }}
                disabled={props.isSubmitting}
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
                      disabled={props.isSubmitting}
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
                      disabled={props.isSubmitting}
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
                      !formik.isValid || !formik.dirty || props.isSubmitting
                    }
                    sx={{
                      backgroundColor: props.themeStyle.palette.success.main,
                      height: '100%',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: props.themeStyle.palette.success.dark,
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
      {props.personContact.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {props.personContact.map((contact, index) => (
              <ContactCard
                key={index}
                index={index}
                contact={contact}
                themeStyle={props.themeStyle}
                isSubmitting={props.isSubmitting}
                personContact={props.personContact}
                handleSetFieldValue={props.handleSetFieldValue}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default ContactInformationSection;
