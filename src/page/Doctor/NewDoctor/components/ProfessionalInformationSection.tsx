import { alpha, Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import type { IFormValues } from '../types/newDoctor.types';
import { FiActivity } from 'react-icons/fi';
import type { FormikProps } from 'formik';

import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';
import type { IBasicIdNameDescription } from 'src/types/common.types';

import { AutocompleteComponent, TextFieldBasic } from '@components/index';
import useProfessionalInformationSection from '../hook/useProfessionalInformationSection';

interface IProfessionalInformationSectionProps {
  formikProps: FormikProps<IFormValues>;
}

const ProfessionalInformationSection = ({
  formikProps,
}: IProfessionalInformationSectionProps) => {
  const hook = useProfessionalInformationSection();
  const theme = useTheme();

  const getSelectedSpecialty = (): IAutocompleteOption | null => {
    const selectedId = formikProps.values.specialty_id;
    if (!selectedId) return null;

    const specialty = hook.specialties.find(
      (s) => s.id.toString() === selectedId.toString(),
    );
    return specialty
      ? { label: specialty.name, id: specialty.id.toString() }
      : null;
  };

  const specialtyOptions = hook.getSpecialtyOptions(hook.specialties);
  const selectedSpecialty = getSelectedSpecialty();

  const selectedSpecialties = hook.specialties.filter(
    (specialty: IBasicIdNameDescription) =>
      formikProps.values.specialty_ids?.includes(specialty.id),
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <FiActivity
          size={24}
          color={theme.palette.primary.main}
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
                    color: theme.palette.text.primary,
                    mb: 0.5,
                  }}
                >
                  Especialidades adicionales
                  <Typography variant="caption"> (Opcional)</Typography>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
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
                value={hook.convertToAutocompleteOptions(selectedSpecialties)}
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
                disabled={formikProps.isSubmitting}
              />

              {/* Mostrar especialidades seleccionadas */}
              {selectedSpecialties.length > 0 && (
                <Box sx={{ mt: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    Especialidades seleccionadas: {selectedSpecialties.length}
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
                color: theme.palette.text.primary,
                mb: 0.5,
              }}
            >
              Cualificación académica y experiencia{' '}
              <Typography variant="caption"> (Opcional)</Typography>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
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
