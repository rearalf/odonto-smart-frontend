import {
  alpha,
  IconButton,
  Paper,
  Typography,
  useTheme,
  Grid,
  Divider,
} from '@mui/material';
import DialogComponent from '@components/DialogComponent';
import type { IPatient } from '../types/types';
import { RiCloseFill } from 'react-icons/ri';

interface IDialogPatientProps {
  patient: IPatient;
  showDialog: boolean;
  handleClose: () => void;
}

const DialogPatient = ({
  patient,
  showDialog,
  handleClose,
}: IDialogPatientProps) => {
  const theme = useTheme();

  return (
    <DialogComponent
      open={showDialog}
      handleClose={handleClose}
      labelledby="dialog-patient-title"
      describedby="dialog-patient-description"
      maxWidth="md"
      fullWidth
      scroll="paper"
      sxContent={{
        position: 'relative',
        p: { xs: 2, sm: 3 },
        paddingTop: { xs: 8, sm: 4 },
        maxHeight: { xs: '90vh', sm: '85vh' },
        overflow: 'auto',
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: { xs: 10, sm: 16 },
          top: { xs: 10, sm: 10 },
          zIndex: 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 1),
          },
        }}
      >
        <RiCloseFill />
      </IconButton>

      <Typography
        id="dialog-patient-title"
        variant="h5"
        component="h2"
        sx={{ mb: 2 }}
      >
        Detalles del Paciente
      </Typography>

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
        <Grid
          container
          sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, sm: 0 } }}
        >
          <Grid
            sx={{
              width: { xs: '100%', sm: '50%' },
              px: 1,
            }}
          >
            <Typography>
              <b>Nombre completo:</b> {patient.fullName}
            </Typography>
            <Typography>
              <b>Teléfono:</b> {patient.phone}
            </Typography>
            <Typography>
              <b>Fecha de nacimiento:</b> {patient.birth_date}
            </Typography>
            <Typography>
              <b>Edad:</b> {patient.age}
            </Typography>
            <Typography>
              <b>Dirección:</b> {patient.address}
            </Typography>
            <Typography>
              <b>Ocupación:</b> {patient.occupation}
            </Typography>
            <Typography>
              <b>Género:</b> {patient.gender === 'male' ? 'Hombre' : ' Mujer'}
            </Typography>
          </Grid>
          <Grid
            sx={{
              width: { xs: '100%', sm: '50%' },
              px: 1,
            }}
          >
            <Typography>
              <b>Alergias:</b> {patient.allergic_reactions}
            </Typography>
            <Typography>
              <b>Historial médico:</b> {patient.medical_history}
            </Typography>
            <Typography>
              <b>Tratamiento sistémico:</b> {patient.current_systemic_treatment}
            </Typography>
            <Typography>
              <b>Resultados de laboratorio:</b> {patient.lab_results}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Evaluaciones Sistémicas:
        </Typography>

        <Grid container spacing={1}>
          {[
            { key: 'se', label: 'SE' },
            { key: 'sgi', label: 'SGI' },
            { key: 'sgu', label: 'SGU' },
            { key: 'sr', label: 'SR' },
            { key: 'sme', label: 'SME' },
            { key: 'snc', label: 'SNC' },
            { key: 'su', label: 'SU' },
            { key: 'svc', label: 'SVC' },
          ].map((item) => (
            <Grid
              sx={{
                width: { xs: '50%', sm: '25%' },
                px: 1,
              }}
              key={item.key}
            >
              <Typography>
                <b>{item.label}:</b>{' '}
                {patient[item.key as keyof IPatient] ? 'Sí' : 'No'}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Notas del sistema
        </Typography>
        <Typography>{patient.systemNotes1}</Typography>
        <Typography>{patient.systemNotes2}</Typography>
      </Paper>
    </DialogComponent>
  );
};

export default DialogPatient;
