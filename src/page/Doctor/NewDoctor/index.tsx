import { Box, Button, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';

import { BreadCrumbs } from '@components/index';
import useNewDoctor from './useNewDoctor';

import {
  doctorInitialValues,
  doctorSchemaStepOne,
} from './validation/newDoctor.schema';
import { BREADCRUMBS } from './constants/newDoctor';

import PersonalInformationSection from './components/PersonalInformationSection';
import ContactInformationSection from './components/ContactInformationSection';
import AccountInformationSection from './components/AccountInformationSection';
import ProfessionalInformationSection from './components/ProfessionalInformationSection';
import './styles.css';

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
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props) => (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
            <PersonalInformationSection formikProps={props} />

            {/* Account Information Section */}
            <AccountInformationSection
              formikProps={props}
              hookValue={{
                ...hook,
                permissions: [],
                roles: [],
              }}
            />

            {/* Professional Information Section */}
            <ProfessionalInformationSection
              formikProps={props}
              specialties={
                hook.dataSpecialties && hook.dataSpecialties.data
                  ? hook.dataSpecialties.data
                  : []
              }
              isLoadingSpecialty={hook.isLoadingSpecialty}
            />

            {/* Contact Information Section */}
            <ContactInformationSection formikProps={props} />

            <Box
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                mt: '2rem',
              }}
            >
              <Button variant="outlined" color="error">
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!props.isValid || !props.dirty}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default NewDoctor;
