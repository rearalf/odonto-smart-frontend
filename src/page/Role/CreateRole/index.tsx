import {
  Box,
  Grid,
  Paper,
  Checkbox,
  FormGroup,
  Typography,
  FormControlLabel,
} from '@mui/material';
import { FiSave, FiXCircle } from 'react-icons/fi';
import { Form, Formik } from 'formik';

import { headerStyles, paperStylesBase } from '@modules/shared/styles/index';
import {
  ButtonComponent,
  TextFieldBasic,
  BreadCrumbs,
} from 'src/modules/shared/components/index';

import { newRoleSchema } from './validation/newRole.schema';
import useCreateRole from './hook/useCreateRole';
import { BREADCRUMBS } from './constants';

function CreateRole() {
  const hook = useCreateRole();

  return (
    <>
      <BreadCrumbs links={BREADCRUMBS} loading={false} />
      <Box component="header" sx={headerStyles}>
        <Typography variant="h4" component="h1">
          {hook.id ? 'Actaulizar ' : 'Nuevo '} rol
        </Typography>
      </Box>

      <Formik
        enableReinitialize
        onSubmit={hook.handleSubmit}
        validationSchema={newRoleSchema}
        initialValues={hook.initialValues}
      >
        {(props) => (
          <Form>
            <Grid container spacing={3}>
              <Grid
                size={{
                  sm: 12,
                }}
              >
                <Paper
                  elevation={0}
                  sx={paperStylesBase(
                    hook.theme.palette.primary.main,
                    hook.theme.palette.primary.main,
                  )}
                >
                  <Grid container spacing={{ sm: 4 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
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
                    <Grid size={{ xs: 12, md: 6 }}>
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
                  </Grid>
                </Paper>
              </Grid>

              {hook.permissions.length > 0 &&
                hook.permissions.map((permission) => (
                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                      xl: 4,
                    }}
                    key={permission.id}
                  >
                    <Paper
                      elevation={0}
                      sx={paperStylesBase(
                        hook.theme.palette.primary.main,
                        hook.theme.palette.primary.main,
                      )}
                    >
                      <Grid
                        container
                        mb={4}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 500, mb: 1 }}
                        >
                          {permission.label}
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                Array.isArray(permission.children) &&
                                permission.children.every((perm) =>
                                  props.values.permission_id.includes(perm.id),
                                )
                              }
                              indeterminate={
                                Array.isArray(permission.children) &&
                                permission.children.some((perm) =>
                                  props.values.permission_id?.includes(perm.id),
                                ) &&
                                Array.isArray(permission.children) &&
                                !permission.children.every((perm) =>
                                  props.values.permission_id?.includes(perm.id),
                                )
                              }
                              onChange={() => {
                                const allSelected =
                                  Array.isArray(permission.children) &&
                                  permission.children.every((perm) =>
                                    props.values.permission_id?.includes(
                                      perm.id,
                                    ),
                                  );

                                const groupIds = permission.children.map(
                                  (perm) => perm.id,
                                );

                                hook.handleToggleGroupPermissions(
                                  props,
                                  groupIds,
                                  allSelected,
                                );
                              }}
                            />
                          }
                          label="Seleccionar todos"
                        />
                      </Grid>

                      <FormGroup>
                        <Grid container spacing={1}>
                          {Array.isArray(permission.children) &&
                            permission.children.map((permission) => (
                              <Grid
                                size={{
                                  xs: 12,
                                  sm: 6,
                                }}
                                key={permission.id}
                              >
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label={permission.label}
                                  checked={
                                    props.values.permission_id?.includes(
                                      permission.id,
                                    ) ?? false
                                  }
                                  onChange={() =>
                                    hook.handleTogglePermission(
                                      props,
                                      permission,
                                    )
                                  }
                                />
                              </Grid>
                            ))}
                        </Grid>
                      </FormGroup>
                    </Paper>
                  </Grid>
                ))}
            </Grid>

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
                onClick={hook.handleCancelForm}
                disabled={props.isSubmitting}
              />
              <ButtonComponent
                type="submit"
                color="success"
                position="left"
                icon={<FiSave />}
                variant="contained"
                loading={props.isSubmitting}
                text={hook.id ? 'Actualizar' : 'Guardar'}
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
