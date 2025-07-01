import {
  Dialog,
  DialogContent,
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
} from '@mui/material';
import type { FC } from 'react';
import { FiCamera } from 'react-icons/fi';

export interface ISpecialtySchema {
  id: number;
  name: string;
  description: string;
}

export interface IDoctorItemSchema {
  id: number;
  qualification: string | null;
  specialty: ISpecialtySchema;
  specialties: ISpecialtySchema[];
  first_name: string;
  middle_name: string;
  last_name: string;
  full_name: string;
  email: string;
  roles: ISpecialtySchema[];
  permissions: ISpecialtySchema[];
}

interface IDoctorDetailModalProps {
  open: boolean;
  onClose: () => void;
  doctor: IDoctorItemSchema | null;
}

const DoctorDetailModal: FC<IDoctorDetailModalProps> = ({
  open,
  onClose,
  doctor,
}) => {
  const theme = useTheme();
  if (!doctor) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
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
          <Grid
            container
            size={{ xs: 12, sm: 12, md: 12 }}
            spacing={3}
            // display="grid"
            // alignItems="center"
            // sx={{
            //   justifyContent: {
            //     xs: 'center',
            //     md: 'flex-start',
            //   },
            // }}
          >
            <Grid
              size={{ xs: 12, sm: 3, md: 3, xl: 3 }}
              //   display="flex"
              //   justifyContent={{
              //     xs: 'center',
              //     md: 'flex-start',
              //   }}
            >
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
            </Grid>

            <Grid size={{ xs: 12, sm: 4.5, md: 3, xl: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500 }}
                textAlign={{
                  sx: 'center',
                  md: 'left',
                }}
              >
                Personal Information
              </Typography>
              <Typography>
                <strong>Full Name:</strong> {doctor.full_name}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Stack spacing={3}>
          {/* Full Name and Email */}
          <Box>
            <Typography variant="h6">Personal Information</Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid>
                <Typography>
                  <strong>Full Name:</strong> {doctor.full_name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {doctor.email}
                </Typography>
              </Grid>
              <Grid>
                <Typography>
                  <strong>Qualification:</strong> {doctor.qualification ?? '—'}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Primary Specialty */}
          <Box>
            <Typography variant="h6">Primary Specialty</Typography>
            <Divider sx={{ my: 1 }} />
            <Chip
              label={doctor.specialty.name}
              variant="filled"
              color="primary"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {doctor.specialty.description}
            </Typography>
          </Box>

          {/* Additional Specialties */}
          <Box>
            <Typography variant="h6">Secondary Specialties</Typography>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {doctor.specialties.map((s) => (
                <Chip
                  key={s.id}
                  label={s.name}
                  avatar={<Avatar>{s.name.charAt(0)}</Avatar>}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>

          {/* Roles */}
          <Box>
            <Typography variant="h6">Roles</Typography>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {doctor.roles.map((role) => (
                <Chip
                  key={role.id}
                  label={role.name}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>

          {/* Permissions */}
          <Box>
            <Typography variant="h6">Permissions</Typography>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {doctor.permissions.map((perm) => (
                <Chip
                  key={perm.id}
                  label={perm.name}
                  variant="outlined"
                  sx={{ bgcolor: '#f5f5f5' }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDetailModal;
