import type { Theme } from '@mui/material/styles';
import { Box, Grid, Paper, Typography } from '@mui/material';

import { paperStylesBase } from '@styles/index';
import { MdOutlineMedicalInformation } from 'react-icons/md';
import TextFieldBasic from '@components/TextFieldBasic';
import type { ITextFields } from '@components/PersonalInformationSection/type';

interface IGeneralMedicalHistoryProps {
  themeStyle: Theme;
  textLabResults: ITextFields;
  textMedicalHistory: ITextFields;
  textAllergicReactions: ITextFields;
  textCurrentSystemicTreatment: ITextFields;
}

const GeneralMedicalHistory = (props: IGeneralMedicalHistoryProps) => {
  return (
    <Paper
      elevation={0}
      sx={paperStylesBase(
        props.themeStyle.palette.primary.main,
        props.themeStyle.palette.primary.main,
      )}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <MdOutlineMedicalInformation
          size={24}
          color={props.themeStyle.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Historial Clínico General
          <Typography variant="caption"> (Opcional)</Typography>
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          alignItems: 'center',
          justifyContent: {
            xs: 'center',
            lg: 'left',
          },
        }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldBasic
            multiline
            type="text"
            id={props.textMedicalHistory.id}
            label="Historial Médico"
            ariaLabel="Historial Médico"
            placeholder="Ejemplo: Diabetes tipo 2, hipertensión, cirugías previas..."
            onChange={props.textMedicalHistory.handleChange}
            value={props.textMedicalHistory.value}
            disabled={props.textMedicalHistory.disabled}
            handleOnBlur={props.textMedicalHistory.handleOnBlur}
            helperText={props.textMedicalHistory.helperText}
            error={props.textMedicalHistory.error}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldBasic
            multiline
            type="text"
            id={props.textAllergicReactions.id}
            label="Alergias / Reacciones"
            ariaLabel="Alergias / Reacciones"
            placeholder="Ejemplo: Penicilina, mariscos, polen..."
            onChange={props.textAllergicReactions.handleChange}
            value={props.textAllergicReactions.value}
            disabled={props.textAllergicReactions.disabled}
            handleOnBlur={props.textAllergicReactions.handleOnBlur}
            helperText={props.textAllergicReactions.helperText}
            error={props.textAllergicReactions.error}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldBasic
            multiline
            type="text"
            id={props.textCurrentSystemicTreatment.id}
            label="Tratamiento sistémico actual"
            ariaLabel="Tratamiento sistémico actual"
            placeholder="Ejemplo: Insulina, antihipertensivos, corticoides..."
            onChange={props.textCurrentSystemicTreatment.handleChange}
            value={props.textCurrentSystemicTreatment.value}
            disabled={props.textCurrentSystemicTreatment.disabled}
            handleOnBlur={props.textCurrentSystemicTreatment.handleOnBlur}
            helperText={props.textCurrentSystemicTreatment.helperText}
            error={props.textCurrentSystemicTreatment.error}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldBasic
            multiline
            type="text"
            id={props.textLabResults.id}
            label="Resultados de laboratorio"
            ariaLabel="Resultados de laboratorio"
            placeholder="Ejemplo: Examen de sangre, radiografía, biometría..."
            onChange={props.textLabResults.handleChange}
            value={props.textLabResults.value}
            disabled={props.textLabResults.disabled}
            handleOnBlur={props.textLabResults.handleOnBlur}
            helperText={props.textLabResults.helperText}
            error={props.textLabResults.error}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GeneralMedicalHistory;
