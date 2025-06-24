import { Box, Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import { BREADCRUMBS, INITIAL_VALUES } from './constants/newDoctor';
import { newDoctorSchema } from './validation/newDoctor.schema';

import ProfessionalInformationSection from './components/ProfessionalInformationSection';
import PersonalInformationSection from './components/PersonalInformationSection';
import ContactInformationSection from './components/ContactInformationSection';
import AccountInformationSection from './components/AccountInformationSection';
import { BreadCrumbs } from '@components/index';
import useNewDoctor from './hook/useNewDoctor';

function NewDoctor() {
  const hook = useNewDoctor();
  return (
    <Box component="div">
      <BreadCrumbs links={BREADCRUMBS} loading={false} />
      <Box
        component="header"
        sx={{
          mt: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
            letterSpacing: '-0.02em',
          }}
        >
          Nuevo doctor
        </Typography>
      </Box>

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={newDoctorSchema}
        onSubmit={hook.handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props) => (
          <Form>
            {/* Personal Information Section */}
            <PersonalInformationSection formikProps={props} />

            {/* Account Information Section */}
            <AccountInformationSection formikProps={props} />

            {/* Professional Information Section */}
            <ProfessionalInformationSection formikProps={props} />

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
              <Button
                variant="outlined"
                color="error"
                disabled={props.isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                loading={props.isSubmitting}
                disabled={!props.isValid || !props.dirty}
              >
                Guardar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default NewDoctor;
