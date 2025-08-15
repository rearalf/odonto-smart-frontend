import DialogComponent from 'src/modules/shared/components/DialogComponent';
import {
  Grid,
  Typography,
  Chip,
  Avatar,
  Box,
  Divider,
  Stack,
  useTheme,
  alpha,
  Paper,
  Link,
  Tooltip,
  IconButton,
  Skeleton,
} from '@mui/material';
import { RiCloseFill } from 'react-icons/ri';
import { FiCamera } from 'react-icons/fi';
import type { FC } from 'react';
import type { IDoctorDetail } from '../types/doctor.type';

interface IDoctorDetailModalProps {
  open: boolean;
  onClose: (id: number | null) => void;
  doctor: IDoctorDetail | null;
  isLoadingDoctorDetail: boolean;
}

const DoctorDetailModal: FC<IDoctorDetailModalProps> = ({
  open,
  onClose,
  doctor,
  isLoadingDoctorDetail,
}) => {
  const theme = useTheme();

  if (!doctor) return null;

  return (
    <DialogComponent
      fullWidth
      maxWidth="md"
      describedby="Ventana de información general del doctor"
      labelledby="doctor-information-dialog"
      open={open}
      handleClose={() => onClose(null)}
      sxContent={{
        position: 'relative',
        // Padding responsivo para el modal
        p: { xs: 2, sm: 3 },
        // Altura máxima para evitar overflow en móviles
        maxHeight: { xs: '90vh', sm: '85vh' },
        overflow: 'auto',
      }}
    >
      {/* Botón de cierre con posición responsiva */}
      <IconButton
        onClick={() => onClose(null)}
        sx={{
          position: 'absolute',
          right: { xs: 16, sm: 36 },
          top: { xs: 16, sm: 26 },
          zIndex: 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 1),
          },
        }}
      >
        <RiCloseFill />
      </IconButton>

      {/* Sección de información personal */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: { xs: 2, sm: 3 },
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Avatar con mejor responsive */}
          <Grid
            size={{ xs: 12, sm: 3 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              sx={{
                width: { xs: 80, sm: 100, md: 125, lg: 150 },
                height: { xs: 80, sm: 100, md: 125, lg: 150 },
                fontSize: { xs: 20, sm: 24, md: 32, lg: 40 },
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: { xs: 20, sm: 24, md: 32, lg: 40 },
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                <FiCamera />
              </Box>
            </Avatar>
          </Grid>

          {/* Información personal */}
          <Grid
            size={{ xs: 12, sm: 9 }}
            display="flex"
            flexDirection="column"
            gap={{ xs: 1, sm: 2 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
              textAlign={{ xs: 'center', sm: 'left' }}
            >
              Información personal
            </Typography>

            <Stack spacing={{ xs: 1, sm: 1.5 }}>
              {/* Nombre completo */}
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    wordBreak: 'break-word',
                  }}
                >
                  <strong>Nombre completo:</strong> {doctor.full_name}
                </Typography>
              </Box>

              {/* Correo */}
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    wordBreak: 'break-word',
                  }}
                >
                  <strong>Correo:</strong>{' '}
                  <Link
                    href={`mailto:${doctor.email}`}
                    underline="hover"
                    color="primary"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  >
                    {doctor.email}
                  </Link>
                </Typography>
              </Box>

              {/* Especialidad principal */}
              <Box>
                <Typography
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 0.5, sm: 1 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  <strong>Especialidad:</strong>
                  <Tooltip title={doctor.specialty.description} arrow>
                    <Chip
                      label={doctor.specialty.name}
                      color="primary"
                      variant="filled"
                      sx={{
                        borderRadius: '999px',
                        px: { xs: 1, sm: 2 },
                        py: 0.5,
                        fontSize: { xs: 12, sm: 14 },
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.15),
                        color: 'primary.main',
                        '& .MuiChip-label': {
                          px: { xs: 0.5, sm: 1 },
                        },
                      }}
                    />
                  </Tooltip>
                </Typography>
              </Box>

              {/* Especialidades adicionales */}
              {doctor.specialties.length > 0 && (
                <Box>
                  <Typography
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      flexDirection: 'column',
                      gap: { xs: 0.5, sm: 1 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    <strong>Especialidades:</strong>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      gap={1}
                      sx={{ width: '100%' }}
                    >
                      {doctor.specialties.map((s) => (
                        <Tooltip title={s.description} arrow key={s.id}>
                          <Chip
                            label={s.name}
                            variant="outlined"
                            color="secondary"
                            avatar={
                              <Avatar
                                sx={{
                                  bgcolor: (theme) =>
                                    alpha(theme.palette.secondary.main, 0.2),
                                  color: 'secondary.main',
                                  fontSize: { xs: 12, sm: 14 },
                                  width: { xs: 20, sm: 24 },
                                  height: { xs: 20, sm: 24 },
                                }}
                              >
                                {s.name.charAt(0).toUpperCase()}
                              </Avatar>
                            }
                            sx={{
                              borderRadius: '999px',
                              px: { xs: 0.5, sm: 1 },
                              py: 0.35,
                              fontSize: { xs: 12, sm: 14 },
                              fontWeight: 500,
                              textTransform: 'capitalize',
                              borderColor: (theme) =>
                                alpha(theme.palette.secondary.main, 0.5),
                            }}
                          />
                        </Tooltip>
                      ))}
                    </Stack>
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Sección de cualificación académica */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: { xs: 2, sm: 3 },
          backgroundColor: alpha(theme.palette.info.main, 0.04),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
          borderRadius: 2,
        }}
      >
        {isLoadingDoctorDetail ? (
          <Skeleton variant="rounded" height={100} />
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              Cualificación académica y experiencia
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              {doctor.qualification ?? '—'}
            </Typography>
          </>
        )}
      </Paper>

      {/* Sección de roles y permisos */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: alpha(theme.palette.info.main, 0.04),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
          borderRadius: 2,
        }}
      >
        <Stack spacing={{ xs: 2, sm: 3 }}>
          {/* Roles */}
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
            >
              Roles
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              gap={1}
              sx={{ width: '100%' }}
            >
              {doctor.roles.map((r) => (
                <Tooltip title={r.description} key={r.id} arrow>
                  <Chip
                    label={r.name}
                    variant="outlined"
                    color="warning"
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: (theme) =>
                            alpha(theme.palette.warning.main, 0.2),
                          color: 'warning.main',
                          fontSize: { xs: 12, sm: 14 },
                          width: { xs: 20, sm: 24 },
                          height: { xs: 20, sm: 24 },
                        }}
                      >
                        {r.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    sx={{
                      borderRadius: '999px',
                      px: { xs: 0.5, sm: 1 },
                      py: 0.35,
                      fontSize: { xs: 12, sm: 14 },
                      fontWeight: 500,
                      textTransform: 'capitalize',
                      borderColor: (theme) =>
                        alpha(theme.palette.warning.main, 0.5),
                      color: theme.palette.warning.main,
                      bgcolor: (theme) =>
                        alpha(theme.palette.warning.main, 0.03),
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>

          {/* Permisos */}
          {doctor.permissions.length > 0 && (
            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                Permisos
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                gap={1}
                sx={{ width: '100%' }}
              >
                {doctor.permissions.map((p) => (
                  <Tooltip title={p.description} key={p.id} arrow>
                    <Chip
                      label={p.label || p.name}
                      variant="outlined"
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: (theme) =>
                              alpha(theme.palette.error.main, 0.15),
                            color: theme.palette.error.main,
                            fontSize: { xs: 12, sm: 14 },
                            width: { xs: 20, sm: 24 },
                            height: { xs: 20, sm: 24 },
                          }}
                        >
                          {p.name.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      sx={{
                        borderRadius: '999px',
                        px: { xs: 0.5, sm: 1 },
                        py: 0.35,
                        fontSize: { xs: 12, sm: 14 },
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        borderColor: (theme) =>
                          alpha(theme.palette.error.main, 0.5),
                        color: theme.palette.error.main,
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.03),
                      }}
                    />
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </DialogComponent>
  );
};

export default DoctorDetailModal;
