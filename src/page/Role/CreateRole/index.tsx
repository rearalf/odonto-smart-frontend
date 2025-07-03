import { Box, Grid, Paper, Typography } from '@mui/material';
import { FiSave, FiXCircle } from 'react-icons/fi';
import { Form, Formik } from 'formik';

import { headerStyles, paperStylesBase } from '@styles/index';
import {
  AutocompleteComponent,
  ButtonComponent,
  TextFieldBasic,
  BreadCrumbs,
} from '@components/index';

import { BREADCRUMBS, INITIAL_VALUES } from './constants';
import { newRoleSchema } from './validation/newRole.schema';
import useCreateRole from './hook/useCreateRole';

function CreateRole() {
  const hook = useCreateRole();
  return (
    <>
      <BreadCrumbs links={BREADCRUMBS} loading={false} />
      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          Nuevo rol
        </Typography>
      </Box>

      <Formik
        validationSchema={newRoleSchema}
        initialValues={INITIAL_VALUES}
        onSubmit={hook.handleSubmit}
      >
        {(props) => (
          <Form>
            <Paper
              elevation={0}
              sx={paperStylesBase(
                hook.theme.palette.primary.main,
                hook.theme.palette.primary.main,
              )}
            >
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextFieldBasic
                    required
                    id="name"
                    type="text"
                    label="Nombre del rol"
                    ariaLabel="Nombre del rol"
                    placeholder="Odontólogo"
                    value={props.values.name}
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    handleOnBlur={() => {
                      props.validateField('name');
                      props.setFieldTouched('name', true);
                    }}
                    helperText={
                      props.touched.name && props.errors.name
                        ? props.errors.name
                        : ''
                    }
                    error={props.touched.name && Boolean(props.errors.name)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextFieldBasic
                    multiline
                    type="text"
                    id="description"
                    label="Descripción detallada"
                    ariaLabel="Descripción detallada"
                    placeholder="Ejemplo: Tiene acceso al historial clínico, puede registrar diagnósticos, tratamientos y ver su agenda de citas."
                    onChange={props.handleChange}
                    value={props.values.description}
                    disabled={props.isSubmitting}
                    handleOnBlur={() => {
                      props.setFieldTouched('description', true);
                      props.validateField('description');
                    }}
                    helperText={
                      props.touched.description && props.errors.description
                        ? props.errors.description
                        : ''
                    }
                    error={
                      props.touched.description &&
                      Boolean(props.errors.description)
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <AutocompleteComponent
                    multiple
                    fullWidth
                    loading={false}
                    id="permission_id"
                    label="Permisos"
                    placeholder="Seleccionar permisos..."
                    options={hook.convertToAutocompleteOptions(
                      hook.permissions,
                      true,
                    )}
                    value={hook.convertToAutocompleteOptions(
                      hook.handleSelectedPermissions(props),
                      true,
                    )}
                    onChange={(newValue) => {
                      const permissionIds = newValue.map(
                        (permission) => permission.id,
                      );
                      props.setFieldValue('permission_id', permissionIds);
                    }}
                    helperText={
                      props.touched.permission_id && props.errors.permission_id
                        ? props.errors.permission_id
                        : ''
                    }
                    onBlur={() => {
                      props.validateField('permission_id');
                      props.setFieldTouched('permission_id', true);
                    }}
                    error={
                      props.touched.permission_id &&
                      Boolean(props.errors.permission_id)
                    }
                    disabled={props.isSubmitting}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: hook.theme.palette.text.secondary,
                        fontWeight: 500,
                        display: 'block',
                      }}
                    >
                      Permisos seleccionados:{' '}
                      {props.values.permission_id.length}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Box
              component="div"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 2,
              }}
            >
              <ButtonComponent
                color="error"
                text="Cancelar"
                position="left"
                variant="outlined"
                icon={<FiXCircle />}
                loading={props.isSubmitting}
              />
              <ButtonComponent
                type="submit"
                text="Guardar"
                color="success"
                position="left"
                icon={<FiSave />}
                variant="contained"
                loading={props.isSubmitting}
                disabled={!props.isValid || !props.dirty || props.isSubmitting}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateRole;
