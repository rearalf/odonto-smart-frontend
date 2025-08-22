import { FiUser } from 'react-icons/fi';
import {
  Box,
  Grid,
  Paper,
  Checkbox,
  Typography,
  FormControlLabel,
} from '@mui/material';

import {
  TextFieldBasic,
  TextFieldPhone,
  AvatarComponent,
  DatePickerComponent,
} from '@components/index';
import { paperStylesBase } from '@styles/index';
import type { IPersonalInformationSection } from './type';

const PersonalInformationSection = ({
  themeStyle,
  birth_date,
  textFieldName,
  textFieldAddress,
  textFieldLastName,
  textFieldMiddleName,
  textFieldOccupation,
  complete_odontogram,
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

        {birth_date && (
          <Grid size={{ xs: 12, md: 3, lg: 4 }}>
            <DatePickerComponent
              required
              id="birth_date"
              value={birth_date.value}
              error={birth_date.error}
              label="Fecha de Nacimiento"
              onChange={birth_date.onChange}
              helperText={birth_date.helperText}
            />
          </Grid>
        )}
        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <TextFieldPhone
            id="contact_value"
            label={'Teléfono'}
            value={''}
            onChange={() => {}}
          />
        </Grid>
        {textFieldAddress && (
          <Grid size={{ xs: 12, md: 3, lg: 4 }}>
            <TextFieldBasic
              type="text"
              placeholder="Calle Falsa 123"
              label="Dirección"
              ariaLabel="Dirección"
              id={textFieldAddress.id}
              value={textFieldAddress.value}
              disabled={textFieldAddress.disabled}
              onChange={textFieldAddress.handleChange}
              handleOnBlur={textFieldAddress.handleOnBlur}
              helperText={textFieldAddress.helperText}
              error={textFieldAddress.error}
            />
          </Grid>
        )}
        {textFieldOccupation && (
          <Grid size={{ xs: 12, md: 3, lg: 4 }}>
            <TextFieldBasic
              type="text"
              label="Ocupación"
              ariaLabel="Ocupación"
              id={textFieldOccupation.id}
              value={textFieldOccupation.value}
              disabled={textFieldOccupation.disabled}
              onChange={textFieldOccupation.handleChange}
              handleOnBlur={textFieldOccupation.handleOnBlur}
              helperText={textFieldOccupation.helperText}
              error={textFieldOccupation.error}
            />
          </Grid>
        )}
        {complete_odontogram && (
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControlLabel
              control={
                <Checkbox
                  id="complete_odontogram"
                  checked={complete_odontogram.checked}
                  onChange={complete_odontogram.onChange}
                />
              }
              label="Odontograma Completo"
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PersonalInformationSection;
