import { Box, Grid, Paper, Typography } from '@mui/material';
import { FiUser } from 'react-icons/fi';

import type { FormikProps } from 'formik';

import { TextFieldBasic } from '@components/index';
import type { IFormValues } from '../types/newDoctor.types';
import useStyles from '../hook/useStyles';

interface IPersonalInformationSection {
  formikProps: FormikProps<IFormValues>;
}

const PersonalInformationSection = ({
  formikProps,
}: IPersonalInformationSection) => {
  const styles = useStyles();

  return (
    <Paper elevation={0} sx={styles.paperStyles}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <FiUser
          size={24}
          color={styles.theme.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Datos Personales
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Picture */}
        {/*   <Grid>
          <Avatar
            // src={props.values.person.profile_picture}
            sx={{
              width: 100,
              height: 100,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <FiCamera size={32} color={theme.palette.primary.main} />
          </Avatar>
        </Grid> */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextFieldBasic
            required
            type="text"
            placeholder="Juan"
            label="Primer nombre"
            id="person.first_name"
            value={formikProps.values.person.first_name}
            disabled={formikProps.isSubmitting}
            onChange={formikProps.handleChange}
            handleOnBlur={() => {
              formikProps.validateField('person.first_name');
              formikProps.setFieldTouched('person.first_name', true);
            }}
            helperText={
              formikProps.touched.person?.first_name &&
              formikProps.errors.person?.first_name
                ? formikProps.errors.person?.first_name
                : ''
            }
            error={
              formikProps.touched.person?.first_name &&
              Boolean(formikProps.errors.person?.first_name)
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextFieldBasic
            type="text"
            label="Segundo nombre"
            id="person.middle_name"
            placeholder="Carlos (Opcional)"
            value={formikProps.values.person.middle_name ?? ''}
            disabled={formikProps.isSubmitting}
            onChange={formikProps.handleChange}
            helperText={formikProps.errors.person?.middle_name}
            error={formikProps.errors.person?.middle_name !== undefined}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextFieldBasic
            required
            type="text"
            label="Apellidos"
            id="person.last_name"
            placeholder="Pérez García"
            value={formikProps.values.person.last_name}
            disabled={formikProps.isSubmitting}
            onChange={formikProps.handleChange}
            handleOnBlur={() => {
              formikProps.setFieldTouched('person.last_name', true);
              formikProps.validateField('person.last_name');
            }}
            helperText={
              formikProps.touched.person?.last_name
                ? formikProps.errors.person?.last_name
                : ''
            }
            error={
              formikProps.touched.person?.last_name &&
              Boolean(formikProps.errors.person?.last_name)
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalInformationSection;
