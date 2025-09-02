import { Box, Grid, Paper, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { FaNotesMedical } from 'react-icons/fa';
import type { SyntheticEvent } from 'react';

import { paperStylesBase } from '@styles/index';
import { TextFieldBasic, CheckboxComponent } from '@components/index';
import type { ITextFields } from '../../shared/components/PersonalInformationSection/type';

interface ICheckbox {
  checked: boolean;
  onChange: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
  disabled: boolean;
}

interface IHealthHistoryBySystemProps {
  themeStyle: Theme;
  snc: ICheckbox;
  svc: ICheckbox;
  se: ICheckbox;
  sme: ICheckbox;
  systemNotes1: ITextFields;
  sr: ICheckbox;
  su: ICheckbox;
  sgu: ICheckbox;
  sgi: ICheckbox;
  systemNotes2: ITextFields;
}

const HealthHistoryBySystem = (props: IHealthHistoryBySystemProps) => {
  return (
    <Paper
      elevation={0}
      sx={paperStylesBase(
        props.themeStyle.palette.primary.main,
        props.themeStyle.palette.primary.main,
      )}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <FaNotesMedical
          size={24}
          color={props.themeStyle.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Examen Sistémico
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
        <Grid
          container
          spacing={1}
          size={{ xs: 12, md: 6 }}
          sx={{
            alignItems: 'center',
            justifyContent: {
              xs: 'center',
              lg: 'left',
            },
          }}
        >
          <CheckboxComponent
            id="snc"
            label="SNC"
            checked={props.snc.checked}
            onChange={props.snc.onChange}
            disabled={props.snc.disabled}
          />
          <CheckboxComponent
            id="svc"
            label="SVC"
            checked={props.svc.checked}
            onChange={props.svc.onChange}
            disabled={props.svc.disabled}
          />
          <CheckboxComponent
            id="se"
            label="SE"
            checked={props.se.checked}
            onChange={props.se.onChange}
            disabled={props.se.disabled}
          />
          <CheckboxComponent
            id="sme"
            label="SME"
            checked={props.sme.checked}
            onChange={props.sme.onChange}
            disabled={props.sme.disabled}
          />

          <TextFieldBasic
            multiline
            type="text"
            id={props.systemNotes1.id}
            label="Revisión de Sistemas Esenciales"
            ariaLabel="Revisión de Sistemas Esenciales"
            placeholder="Describa hallazgos del sistema nervioso central, cardiovascular, endocrino y musculoesquelético (ej. normales, alteraciones, síntomas presentes)."
            onChange={props.systemNotes1.handleChange}
            value={props.systemNotes1.value}
            disabled={props.systemNotes1.disabled}
            handleOnBlur={props.systemNotes1.handleOnBlur}
            helperText={props.systemNotes1.helperText}
            error={props.systemNotes1.error}
          />
        </Grid>
        <Grid
          container
          spacing={1}
          size={{ xs: 12, md: 6 }}
          sx={{
            alignItems: 'center',
            justifyContent: {
              xs: 'center',
              lg: 'left',
            },
          }}
        >
          <CheckboxComponent
            id="sr"
            label="SR"
            checked={props.sr.checked}
            onChange={props.sr.onChange}
            disabled={props.sr.disabled}
          />
          <CheckboxComponent
            id="su"
            label="SU"
            checked={props.su.checked}
            onChange={props.su.onChange}
            disabled={props.su.disabled}
          />
          <CheckboxComponent
            id="sgu"
            label="SGU"
            checked={props.sgu.checked}
            onChange={props.sgu.onChange}
            disabled={props.sgu.disabled}
          />
          <CheckboxComponent
            id="sgi"
            label="SGI"
            checked={props.sgi.checked}
            onChange={props.sgi.onChange}
            disabled={props.sgi.disabled}
          />

          <TextFieldBasic
            multiline
            type="text"
            id={props.systemNotes2.id}
            label="Revisión de Aparatos y Sistemas"
            ariaLabel="Revisión de Aparatos y Sistemas"
            placeholder="Describa hallazgos del sistema respiratorio, urinario, genitourinario y gastrointestinal (ej. normales, alteraciones, síntomas presentes)."
            onChange={props.systemNotes2.handleChange}
            value={props.systemNotes2.value}
            disabled={props.systemNotes2.disabled}
            handleOnBlur={props.systemNotes2.handleOnBlur}
            helperText={props.systemNotes2.helperText}
            error={props.systemNotes2.error}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HealthHistoryBySystem;
