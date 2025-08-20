import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import { ContactInformationSection, BreadCrumbs } from '@components/index';

import { newPatientSchema } from '../validation/newPatient.schema';
import type { INewPatientFormValues } from '../types/types';
import useStyles from '../hooks/useStyles';
import {
  INITIAL_VALUES,
  BREADCRUMBSNEWPATIENT,
} from '../constants/index.const';

function NewPatientPage() {
  const styles = useStyles();
  return (
    <>
      <BreadCrumbs links={BREADCRUMBSNEWPATIENT} loading={false} />

      <Box component="header" sx={styles.headerStyles}>
        <Typography variant="h4" component="h1">
          Nuevo paciente
        </Typography>
      </Box>

      <Formik<INewPatientFormValues>
        initialValues={INITIAL_VALUES}
        validationSchema={newPatientSchema}
        onSubmit={() => {}}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(props) => (
          <Form>
            <ContactInformationSection<INewPatientFormValues>
              themeStyle={styles.theme}
              formikProps={props}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default NewPatientPage;
