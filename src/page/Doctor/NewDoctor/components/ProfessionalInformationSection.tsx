import {
  alpha,
  Autocomplete,
  Box,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { FiActivity } from 'react-icons/fi';
import { TextFieldBasic } from '@components/index';
import type { FormikProps } from 'formik';
import type { IFormValues } from '../types/newDoctor.types';
import type { IBasicIdNameDescription } from 'src/types/common.types';

interface IProfessionalInformationSectionProps {
  formikProps: FormikProps<IFormValues>;
  specialties: IBasicIdNameDescription[];
  isLoadingSpecialty: boolean;
}

interface ISpecialtyOption {
  label: string;
  id: string;
}

const ProfessionalInformationSection = ({
  formikProps,
  specialties,
  isLoadingSpecialty,
}: IProfessionalInformationSectionProps) => {
  const theme = useTheme();

  const getSpecialtyOptions = (
    values: IBasicIdNameDescription[],
  ): ISpecialtyOption[] => {
    if (Array.isArray(values)) {
      return values.map((value) => ({
        label: value.name,
        id: value.id.toString(),
      }));
    }
    return [];
  };

  const getSelectedSpecialty = (): ISpecialtyOption | null => {
    const selectedId = formikProps.values.specialty_id;
    if (!selectedId) return null;

    const specialty = specialties.find((s) => s.id === selectedId);
    return specialty
      ? { label: specialty.name, id: specialty.id.toString() }
      : null;
  };

  const specialtyOptions = getSpecialtyOptions(specialties);
  const selectedSpecialty = getSelectedSpecialty();

  const selectedSpecialties = specialties.filter(
    (specialty: IBasicIdNameDescription) =>
      formikProps.values.specialty_ids?.includes(specialty.id),
  );

  const handleSpecialtiesChange = (
    _e: any,
    newValue: IBasicIdNameDescription[],
  ) => {
    const specialtyIds = newValue.map((specialty) => specialty.id);
    formikProps.setFieldValue('specialty_ids', specialtyIds);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 2,
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
              <Autocomplete
                id="specialty_id"
                options={specialtyOptions}
                getOptionLabel={(option) => option.label || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={selectedSpecialty}
                onChange={(_event, newValue) => {
                  formikProps.setFieldValue('specialty_id', newValue?.id || '');
                }}
                onBlur={() => {
                  formikProps.setFieldTouched('specialty_id', true);
                  formikProps.validateField('specialty_id');
                }}
                loading={isLoadingSpecialty}
                loadingText="Cargando especialidades..."
                noOptionsText="No se encontraron especialidades"
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Especialidad médica principal *"
                    placeholder="Buscar especialidad..."
                    helperText={
                      formikProps.touched.specialty_id &&
                      formikProps.errors.specialty_id
                        ? formikProps.errors.specialty_id
                        : 'Seleccione la especialidad principal del doctor'
                    }
                    onBlur={() => {
                      formikProps.setFieldTouched('specialty_id', true);
                      formikProps.validateField('specialty_id');
                    }}
                    error={
                      formikProps.touched.specialty_id &&
                      Boolean(formikProps.errors.specialty_id)
                    }
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                )}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    paddingRight: '9px !important',
                  },
                  '& .MuiAutocomplete-endAdornment': {
                    right: '9px',
                  },
                }}
                clearOnEscape
                selectOnFocus
                disableClearable={false}
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
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Opcional: Agregue otras especialidades en las que el doctor
                  tiene certificación o experiencia significativa.
                </Typography>
              </Box>

              <Autocomplete
                multiple
                fullWidth
                id="specialty_ids"
                options={specialties}
                getOptionLabel={(option) => option.name}
                value={selectedSpecialties}
                onChange={handleSpecialtiesChange}
                filterSelectedOptions
                disabled={formikProps.isSubmitting}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...chipProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={key}
                        variant="outlined"
                        label={option.name}
                        size="small"
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.08,
                          ),
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                          color: theme.palette.primary.main,
                          '& .MuiChip-deleteIcon': {
                            color: alpha(theme.palette.primary.main, 0.7),
                            '&:hover': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                        {...chipProps}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Buscar especialidades..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: theme.palette.background.paper,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                )}
                sx={{
                  '& .MuiAutocomplete-popupIndicator': {
                    color: theme.palette.primary.main,
                  },
                }}
              />

              {/* Helper text para especialidades */}
              {formikProps.touched.specialty_ids &&
                formikProps.errors.specialty_ids && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.error.main,
                      mt: 0.5,
                      display: 'block',
                    }}
                  >
                    {formikProps.errors.specialty_ids}
                  </Typography>
                )}

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
              Cualificación académica y experiencia
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
