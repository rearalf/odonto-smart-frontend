import { Box, Grid, Paper, Typography } from '@mui/material';
import { FiUser } from 'react-icons/fi';

import type { Theme } from '@mui/material/styles';

import { paperStylesBase } from '@styles/index';
import TextFieldBasic from '@components/TextFieldBasic';
import AvatarComponent from '@components/AvatarComponent';

interface ITextFields {
  id: string;
  value: string;
  disabled: boolean;
  handleChange: (e: string | React.ChangeEvent<any>) => void;
  handleOnBlur: () => void;
  helperText: string | undefined;
  error: boolean | undefined;
}

interface IPersonalInformationSection {
  themeStyle: Theme;
  textFieldName: ITextFields;
  textFieldMiddleName: ITextFields;
  textFieldLastName: ITextFields;
}

const PersonalInformationSection = ({
  themeStyle,
  textFieldName,
  textFieldLastName,
  textFieldMiddleName,
}: IPersonalInformationSection) => {
  return (
    <Paper
      elevation={0}
      sx={paperStylesBase(
        themeStyle.palette.primary.main,
        themeStyle.palette.primary.main,
      )}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
        <FiUser
          size={24}
          color={themeStyle.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Datos Personales
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
        <Grid>
          <AvatarComponent
            themeStyle={themeStyle}
            name={
              textFieldName.value.trim() +
              ' ' +
              textFieldMiddleName.value.trim() +
              ' ' +
              textFieldLastName.value.trim()
            }
            srcImage={undefined}
            tooltipTitle={undefined}
            disableInteractive={false}
            placement={undefined}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3, lg: 3 }}>
          <TextFieldBasic
            required
            type="text"
            placeholder="Juan"
            label="Primer nombre"
            ariaLabel="Primer nombre"
            id={textFieldName.id}
            value={textFieldName.value}
            disabled={textFieldName.disabled}
            onChange={textFieldName.handleChange}
            handleOnBlur={textFieldName.handleOnBlur}
            helperText={textFieldName.helperText}
            error={textFieldName.error}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3, lg: 3 }}>
          <TextFieldBasic
            type="text"
            label="Segundo nombre"
            ariaLabel="Segundo nombre"
            placeholder="Carlos (Opcional)"
            id={textFieldMiddleName.id}
            value={textFieldMiddleName.value}
            disabled={textFieldMiddleName.disabled}
            onChange={textFieldMiddleName.handleChange}
            handleOnBlur={textFieldMiddleName.handleOnBlur}
            helperText={textFieldMiddleName.helperText}
            error={textFieldMiddleName.error}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <TextFieldBasic
            required
            type="text"
            label="Apellidos"
            ariaLabel="Apellidos"
            placeholder="Pérez García"
            id={textFieldLastName.id}
            value={textFieldLastName.value}
            disabled={textFieldLastName.disabled}
            onChange={textFieldLastName.handleChange}
            handleOnBlur={textFieldLastName.handleOnBlur}
            helperText={textFieldLastName.helperText}
            error={textFieldLastName.error}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalInformationSection;
