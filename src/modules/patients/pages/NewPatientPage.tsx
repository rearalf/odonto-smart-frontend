import type { PickerValue } from '@mui/x-date-pickers/internals';
import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import {
  ContactInformationSection,
  BreadCrumbs,
  PersonalInformationSection,
} from '@components/index';

import { newPatientSchema } from '../validation/newPatient.schema';
import type { INewPatientFormValues } from '../types/types';
import useStyles from '../hooks/useStyles';
import {
  INITIAL_VALUES,
  BREADCRUMBSNEWPATIENT,
} from '../constants/index.const';
import GeneralMedicalHistory from '../components/GeneralMedicalHistory';

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
            <PersonalInformationSection
              themeStyle={styles.theme}
              textFieldName={{
                id: 'first_name',
                value: props.values.first_name,
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('first_name');
                  props.setFieldTouched('first_name', true);
                },
                helperText: props.touched.first_name
                  ? props.errors.first_name
                  : undefined,
                error:
                  props.touched.first_name && Boolean(props.errors.first_name),
              }}
              textFieldLastName={{
                id: 'last_name',
                value: props.values.last_name,
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('last_name');
                  props.setFieldTouched('last_name', true);
                },
                helperText: props.touched.last_name
                  ? props.errors.last_name
                  : undefined,
                error:
                  props.touched.last_name && Boolean(props.errors.last_name),
              }}
              textFieldMiddleName={{
                id: 'middle_name',
                value: props.values.middle_name || '',
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('middle_name');
                  props.setFieldTouched('middle_name', true);
                },
                helperText: props.touched.middle_name
                  ? props.errors.middle_name
                  : undefined,
                error:
                  props.touched.middle_name &&
                  Boolean(props.errors.middle_name),
              }}
              textFieldAddress={{
                id: 'address',
                value: props.values.address || '',
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('address');
                  props.setFieldTouched('address', true);
                },
                helperText: props.touched.address
                  ? props.errors.address
                  : undefined,
                error: props.touched.address && Boolean(props.errors.address),
              }}
              textFieldOccupation={{
                id: 'occupation',
                value: props.values.occupation || '',
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('occupation');
                  props.setFieldTouched('occupation', true);
                },
                helperText: props.touched.occupation
                  ? props.errors.occupation
                  : undefined,
                error:
                  props.touched.occupation && Boolean(props.errors.occupation),
              }}
              complete_odontogram={{
                checked: props.values.complete_odontogram,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setFieldValue('complete_odontogram', e.target.checked);
                },
              }}
              birth_date={{
                helperText: props.touched.birth_date
                  ? props.errors.birth_date
                  : undefined,
                error:
                  props.touched.birth_date && Boolean(props.errors.birth_date),
                value: props.values.birth_date,
                handleOnBlur: () => {
                  props.validateField('birth_date');
                  props.setFieldTouched('birth_date', true);
                },
                onChange: (newValue: PickerValue) => {
                  props.setFieldValue('birth_date', newValue);
                },
              }}
              selectGender={{
                value: props.values.gender,
                onChange: (e) => {
                  props.setFieldValue('gender', e.target.value);
                },
              }}
            />

            <GeneralMedicalHistory
              themeStyle={styles.theme}
              textAllergicReactions={{
                id: 'allergic_reactions',
                value: props.values.allergic_reactions || '',
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('allergic_reactions');
                  props.setFieldTouched('allergic_reactions', true);
                },
                helperText: props.touched.allergic_reactions
                  ? props.errors.allergic_reactions
                  : undefined,
                error:
                  props.touched.allergic_reactions &&
                  Boolean(props.errors.allergic_reactions),
              }}
              textCurrentSystemicTreatment={{
                id: 'current_systemic_treatment',
                value: props.values.current_systemic_treatment || '',
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('current_systemic_treatment');
                  props.setFieldTouched('current_systemic_treatment', true);
                },
                helperText: props.touched.current_systemic_treatment
                  ? props.errors.current_systemic_treatment
                  : undefined,
                error:
                  props.touched.current_systemic_treatment &&
                  Boolean(props.errors.current_systemic_treatment),
              }}
              textLabResults={{
                id: 'lab_results',
                value: props.values.lab_results || '',
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('lab_results');
                  props.setFieldTouched('lab_results', true);
                },
                helperText: props.touched.lab_results
                  ? props.errors.lab_results
                  : undefined,
                error:
                  props.touched.lab_results &&
                  Boolean(props.errors.lab_results),
              }}
              textMedicalHistory={{
                id: 'medical_history',
                value: props.values.medical_history || '',
                disabled: props.isSubmitting,
                handleChange: props.handleChange,
                handleOnBlur: () => {
                  props.validateField('medical_history');
                  props.setFieldTouched('medical_history', true);
                },
                helperText: props.touched.medical_history
                  ? props.errors.medical_history
                  : undefined,
                error:
                  props.touched.medical_history &&
                  Boolean(props.errors.medical_history),
              }}
            />

            <ContactInformationSection
              themeStyle={styles.theme}
              isSubmitting={props.isSubmitting}
              handleSetFieldValue={props.setFieldValue}
              personContact={props.values.personContact}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default NewPatientPage;
