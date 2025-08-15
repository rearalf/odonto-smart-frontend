import { Grid, IconButton, Paper, Tooltip } from '@mui/material';
import { FiRotateCw } from 'react-icons/fi';
import type { Theme } from '@mui/material/styles';

import TextFieldBasic from 'src/modules/shared/components/TextFieldBasic';
import { paperStylesBase } from '@modules/shared/styles/index';
import type { ChangeEvent } from 'react';

interface IFilterRolesProps {
  search: string;
  themeStyle: Theme;
  isLoading: boolean;
  handleClearFilter: () => void;
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FilterRoles = (props: IFilterRolesProps) => {
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
            label="Buscar por nombre"
            ariaLabel="Buscar por nombre"
            placeholder="Odontologo... o Administrador..."
            disabled={props.isLoading}
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

export default FilterRoles;
