import { Grid, IconButton, Paper, Tooltip } from '@mui/material';
import { FiFilter, FiRotateCw } from 'react-icons/fi';

import AutocompleteComponent from '@components/AutocompleteComponent';
import TextFieldBasic from '@components/TextFieldBasic';

import useFilter from '../hook/useFilter';

import type { ChangeEvent } from 'react';

interface IFilterDoctors {
  search: string;
  paperStyles: any;
  handleClearFilter: () => void;
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FilterDoctors = (props: IFilterDoctors) => {
  const filter = useFilter();

  const specialtyOptions = filter.getSpecialtyOptions(filter.specialties);
  const selectedSpecialty = filter.getSelectedSpecialty();

  return (
    <Paper elevation={0} sx={props.paperStyles}>
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
            ariaLabel="Buscar doctor por nombre"
            label="Buscar doctor por nombre"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 5, md: 3, xl: 3 }}>
          <AutocompleteComponent
            fullWidth
            id="specialty_id"
            options={specialtyOptions}
            value={selectedSpecialty}
            loading={filter.isLoading}
            placeholder="Buscar especialidad"
            label="Especialidad médica"
            loadingText="Cargando especialidades..."
            noOptionsText="No se encontraron especialidades"
            onChange={(_newValue) => {}}
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
            <IconButton color="primary" aria-label="Filtrar Doctores">
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

export default FilterDoctors;
