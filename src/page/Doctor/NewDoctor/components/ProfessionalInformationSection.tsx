import { Box, Grid, Paper, Typography } from '@mui/material';
import { FiActivity } from 'react-icons/fi';

import useProfessionalInformationSection from '../hook/useProfessionalInformationSection';
import { AutocompleteComponent, TextFieldBasic } from '@components/index';
import type { IComponentFormProps } from '../types/newDoctor.types';
import useStyles from '../hook/useStyles';

const ProfessionalInformationSection = ({
  formikProps,
}: IComponentFormProps) => {
  const hook = useProfessionalInformationSection({ formikProps });
  const styles = useStyles();

  const specialtyOptions = hook.getSpecialtyOptions(hook.specialties);
  const selectedSpecialty = hook.getSelectedSpecialty();

  return (
    <Paper elevation={0} sx={styles.paperStyles}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <FiActivity
          size={24}
          color={styles.theme.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Información Profesional
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Columna izquierda - Especialidades */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2.5}>
            {/* Especialidad Principal */}
            <Grid size={12}>
              <AutocompleteComponent
                required
                fullWidth
                id="specialty_id"
                options={specialtyOptions}
                value={selectedSpecialty}
                loading={hook.isLoadingSpecialty}
                placeholder="Buscar especialidad"
                label="Especialidad médica principal"
                loadingText="Cargando especialidades..."
                noOptionsText="No se encontraron especialidades"
                disabled={formikProps.isSubmitting}
                onChange={(newValue) => {
                  formikProps.setFieldValue('specialty_id', newValue?.id || '');
                }}
                onBlur={() => {
                  formikProps.setFieldTouched('specialty_id', true);
                  formikProps.validateField('specialty_id');
                }}
                helperText={
                  formikProps.touched.specialty_id &&
                  formikProps.errors.specialty_id
                    ? formikProps.errors.specialty_id
                    : 'Seleccione la especialidad principal del doctor'
                }
                error={
                  formikProps.touched.specialty_id &&
                  Boolean(formikProps.errors.specialty_id)
                }
              />
            </Grid>

            {/* Especialidades Adicionales */}
            <Grid size={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: styles.theme.palette.text.primary,
                    mb: 0.5,
                  }}
                >
                  Especialidades adicionales
                  <Typography variant="caption"> (Opcional)</Typography>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: styles.theme.palette.text.secondary }}
                >
                  Opcional: Agregue otras especialidades en las que el doctor
                  tiene certificación o experiencia significativa.
                </Typography>
              </Box>

              <AutocompleteComponent
                multiple
                fullWidth
                id="specialty_ids"
                label="Especialidades adicionales"
                placeholder="Buscar especialidades..."
                options={hook.convertToAutocompleteOptions(hook.specialties)}
                value={hook.convertToAutocompleteOptions(
                  hook.selectedSpecialties,
                )}
                disabled={formikProps.isSubmitting}
                onChange={(newValue) => {
                  const specialtyIds = newValue.map(
                    (specialty) => specialty.id,
                  );
                  formikProps.setFieldValue('specialty_ids', specialtyIds);
                }}
                helperText={
                  formikProps.touched.specialty_ids &&
                  formikProps.errors.specialty_ids
                    ? formikProps.errors.specialty_ids
                    : 'Seleccione la especialidad principal del doctor'
                }
                onBlur={() => {
                  formikProps.setFieldTouched('specialty_ids', true);
                  formikProps.validateField('specialty_ids');
                }}
                error={
                  formikProps.touched.specialty_ids &&
                  Boolean(formikProps.errors.specialty_ids)
                }
              />

              {/* Mostrar especialidades seleccionadas */}
              {hook.selectedSpecialties.length > 0 && (
                <Box sx={{ mt: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: styles.theme.palette.text.secondary,
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    Especialidades seleccionadas:{' '}
                    {hook.selectedSpecialties.length}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Columna derecha - Cualificación académica */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: styles.theme.palette.text.primary,
                mb: 0.5,
              }}
            >
              Cualificación académica y experiencia{' '}
              <Typography variant="caption"> (Opcional)</Typography>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: styles.theme.palette.text.secondary,
                mb: 2,
              }}
            >
              Incluya títulos universitarios, postgrados, certificaciones, años
              de experiencia, centros médicos donde ha trabajado, publicaciones,
              etc.
            </Typography>

            <TextFieldBasic
              multiline
              type="text"
              id="qualification"
              label="Descripción detallada"
              placeholder="Ejemplo:
• Médico Cirujano - Universidad Nacional (2015)
• Especialización en Cardiología - Hospital Central (2018)
• 5 años de experiencia en UCI Cardiovascular
• Certificación en Ecocardiografía (2020)
• 15 publicaciones en revistas médicas
• Miembro de la Sociedad Cardiológica Nacional"
              onChange={formikProps.handleChange}
              value={formikProps.values.qualification}
              disabled={formikProps.isSubmitting}
              handleOnBlur={() => {
                formikProps.setFieldTouched('qualification', true);
                formikProps.validateField('qualification');
              }}
              helperText={
                formikProps.errors.qualification ||
                'Campo opcional pero recomendado para completar el perfil profesional'
              }
              error={formikProps.errors.qualification !== undefined}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfessionalInformationSection;
