import { FiSave, FiXCircle } from 'react-icons/fi';
import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import { BreadCrumbs, ButtonComponent } from '@components/index';

import { BREADCRUMBS, INITIAL_VALUES } from './constants/newDoctor';
import { newDoctorSchema } from './validation/newDoctor.schema';

import ProfessionalInformationSection from './components/ProfessionalInformationSection';
import PersonalInformationSection from './components/PersonalInformationSection';
import ContactInformationSection from './components/ContactInformationSection';
import AccountInformationSection from './components/AccountInformationSection';
import { btnGroupStyles, headerStyles } from '@styles/index';
import useNewDoctor from './hook/useNewDoctor';

function NewDoctor() {
  const hook = useNewDoctor();
  return (
    <>
      <BreadCrumbs links={BREADCRUMBS} loading={false} />
      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
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

            <Box component="div" sx={btnGroupStyles}>
              <ButtonComponent
                color="error"
                text="Cancelar"
                position="left"
                variant="outlined"
                icon={<FiXCircle />}
                loading={props.isSubmitting}
              />
              <ButtonComponent
                type="submit"
                text="Guardar"
                color="success"
                position="left"
                icon={<FiSave />}
                variant="contained"
                loading={props.isSubmitting}
                disabled={!props.isValid || !props.dirty || props.isSubmitting}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default NewDoctor;
