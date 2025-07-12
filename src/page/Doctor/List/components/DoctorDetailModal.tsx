import DialogComponent from '@components/DialogComponent';
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

import type { IDoctorDetail } from 'src/types/doctor.type';

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
      }}
    >
      <IconButton
        onClick={() => onClose(null)}
        sx={{
          position: 'absolute',
          right: 36,
          top: 26,
        }}
      >
        <RiCloseFill />
      </IconButton>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 2,
        }}
      >
        <Grid container size={12} spacing={3}>
          <Grid
            size={{ xs: 12, sm: 3, md: 3, xl: 3 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              // src={props.values.person.profile_picture}
              sx={{
                width: { xs: 100, sm: 125, md: 150 },
                height: { xs: 100, sm: 125, md: 150 },
                fontSize: { xs: 24, sm: 32, md: 40 },
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: { xs: 24, sm: 32, md: 40 },
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                <FiCamera />
              </Box>
            </Avatar>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 9, md: 9, xl: 9 }}
            gap={{
              xs: 1,
              sm: 2,
            }}
            display="grid"
          >
            <Grid size={12}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500 }}
                textAlign={{
                  sx: 'center',
                  md: 'left',
                }}
              >
                Información personal
              </Typography>
            </Grid>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Grid container direction="column" spacing={1}>
                  <Grid>
                    <Typography>
                      <strong>Nombre completo:</strong> {doctor.full_name}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography>
                      <strong>Correo:</strong>{' '}
                      <Link
                        href={`mailto:${doctor.email}`}
                        underline="hover"
                        color="primary"
                      >
                        {doctor.email}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography
                      component="div"
                      sx={{
                        my: 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <strong>Especialidad: </strong>{' '}
                      <Tooltip title={doctor.specialty.description} arrow>
                        <Chip
                          label={doctor.specialty.name}
                          color="primary"
                          variant="filled"
                          sx={{
                            borderRadius: '999px',
                            px: 2,
                            py: 0.5,
                            fontSize: 14,
                            fontWeight: 500,
                            textTransform: 'capitalize',
                            bgcolor: (theme) =>
                              alpha(theme.palette.primary.main, 0.15),
                            color: 'primary.main',
                            '& .MuiChip-label': {
                              px: 1,
                            },
                          }}
                        />
                      </Tooltip>
                    </Typography>
                  </Grid>
                  {doctor.specialties.length > 0 && (
                    <Grid>
                      <Typography
                        component="div"
                        sx={{
                          my: 0.6,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <strong>Especialidades: </strong>{' '}
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          gap={1}
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
                                        alpha(
                                          theme.palette.secondary.main,
                                          0.2,
                                        ),
                                      color: 'secondary.main',
                                      fontSize: 14,
                                      width: 24,
                                      height: 24,
                                    }}
                                  >
                                    {s.name.charAt(0).toUpperCase()}
                                  </Avatar>
                                }
                                sx={{
                                  borderRadius: '999px',
                                  px: 1,
                                  py: 0.35,
                                  fontSize: 14,
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
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: alpha(theme.palette.info.main, 0.04),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
          borderRadius: 2,
        }}
      >
        {isLoadingDoctorDetail ? (
          <Skeleton variant="rounded" height={100} />
        ) : (
          <>
            <Typography variant="h6">
              Cualificación académica y experiencia
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Typography>{doctor.qualification ?? '—'}</Typography>
          </>
        )}
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: alpha(theme.palette.info.main, 0.04),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
          borderRadius: 2,
        }}
      >
        <Grid display="grid" gap={2}>
          <Box component="div">
            <Typography variant="h6">Roles</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
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
                          fontSize: 14,
                          width: 24,
                          height: 24,
                        }}
                      >
                        {r.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    sx={{
                      borderRadius: '999px',
                      px: 1,
                      py: 0.35,
                      fontSize: 14,
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
          {doctor.permissions.length > 0 && (
            <Box component="div">
              <Typography variant="h6">Permisos</Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
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
                            fontSize: 14,
                            width: 24,
                            height: 24,
                          }}
                        >
                          {p.name.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      sx={{
                        borderRadius: '999px',
                        px: 1,
                        py: 0.35,
                        fontSize: 14,
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
        </Grid>
      </Paper>
    </DialogComponent>
  );
};

export default DoctorDetailModal;
