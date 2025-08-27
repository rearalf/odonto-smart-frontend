import type { Theme } from '@mui/material/styles';
import { Box, Grid, Paper, Typography } from '@mui/material';

import { paperStylesBase } from '@styles/index';
import { MdOutlineMedicalInformation } from 'react-icons/md';
import TextFieldBasic from '@components/TextFieldBasic';

interface IGeneralMedicalHistoryProps {
  themeStyle: Theme;
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
            id="qualification"
            label="Descripción detallada"
            ariaLabel="Descripción detallada"
            placeholder=""
            onChange={() => {}}
            value={''}
            disabled={false}
            handleOnBlur={() => {}}
            helperText={''}
            error={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldBasic
            multiline
            type="text"
            id="qualification"
            label="Descripción detallada"
            ariaLabel="Descripción detallada"
            placeholder=""
            onChange={() => {}}
            value={''}
            disabled={false}
            handleOnBlur={() => {}}
            helperText={''}
            error={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldBasic
            multiline
            type="text"
            id="qualification"
            label="Descripción detallada"
            ariaLabel="Descripción detallada"
            placeholder=""
            onChange={() => {}}
            value={''}
            disabled={false}
            handleOnBlur={() => {}}
            helperText={''}
            error={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextFieldBasic
            multiline
            type="text"
            id="qualification"
            label="Descripción detallada"
            ariaLabel="Descripción detallada"
            placeholder=""
            onChange={() => {}}
            value={''}
            disabled={false}
            handleOnBlur={() => {}}
            helperText={''}
            error={false}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GeneralMedicalHistory;
