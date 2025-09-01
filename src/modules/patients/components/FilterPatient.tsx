import { TextFieldBasic } from '@components/index';
import { Grid, IconButton, Paper, Tooltip } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { paperStylesBase } from '@styles/index';
import type { ChangeEvent } from 'react';
import { FiFilter, FiRotateCw } from 'react-icons/fi';

interface IFilterPatientProps {
  search: string;
  themeStyle: Theme;
  handleSearch: () => void;
  handleClearFilter: () => void;
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FilterPatient = (props: IFilterPatientProps) => {
  return (
    <Paper
      elevation={0}
      sx={paperStylesBase(
        props.themeStyle.palette.primary.main,
        props.themeStyle.palette.primary.main,
      )}
    >
      <Grid
        container
        size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 6 }}
        spacing={3}
        alignItems="center"
        sx={{
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
        }}
      >
        <Grid size={{ xs: 12, sm: 4.5, md: 3, xl: 3 }}>
          <TextFieldBasic
            id="search"
            type="text"
            inputMode="text"
            onChange={props.handleSearchInput}
            value={props.search}
            placeholder="Juan..."
            ariaLabel="Buscar por nombre"
            label="Buscar por nombre"
          />
        </Grid>

        <Grid
          size={{ xs: 12, sm: 2.4, md: 1.8, lg: 1.3, xl: 1 }}
          display="flex"
          sx={{
            justifyContent: {
              xs: 'space-around',
              md: 'space-between',
            },
          }}
          gap={3}
        >
          <Tooltip title="Filtrar Doctores">
            <IconButton
              color="primary"
              aria-label="Filtrar Doctores"
              onClick={props.handleSearch}
            >
              <FiFilter size={22} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Limpiar filtro">
            <IconButton
              color="error"
              aria-label="Limpiar filtro"
              onClick={props.handleClearFilter}
            >
              <FiRotateCw size={22} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPatient;
