import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { FiSave, FiXCircle } from 'react-icons/fi';
import { Form, Formik } from 'formik';
import {
  TextFieldBasic,
  ButtonComponent,
  DialogComponent,
  AutocompleteComponent,
} from '@components/index';

import { INITIAL_VALUES } from '@pages/Role/CreateRole/constants';
import { newRoleSchema } from '../validation/newRole.schema';
import useCreateRole from '../hook/useCreateRole';
import { paperStylesBase } from '@styles/index';

interface ICreateRoleModalProps {
  open: boolean;
  onClose: (refresh?: boolean) => void;
}

function CreateRoleModal({ onClose, open }: ICreateRoleModalProps) {
  const hook = useCreateRole();

  if (!open) return null;

  return (
    <DialogComponent
      fullWidth
      maxWidth="xs"
      describedby="Ventana de advertencia para eliminar un doctor de forma permanente"
      labelledby="delete-doctor-dialog-title"
      open={open}
      handleClose={onClose}
    >
      <DialogComponent.Body>
        <Formik
          validationSchema={newRoleSchema}
          initialValues={INITIAL_VALUES}
          onSubmit={(a, b) => {
            hook.handleSubmit(a, b, onClose);
          }}
        >
          {(props) => (
            <Form>
              <Paper
                elevation={0}
                sx={{
                  ...paperStylesBase(
                    hook.theme.palette.primary.main,
                    hook.theme.palette.primary.main,
                  ),
                  mb: 0,
                }}
              >
                <Typography variant="h5" component="h5" mb={4}>
                  Nuevo rol
                </Typography>

                <Grid container spacing={4} display="grid">
                  <Grid size={{ xs: 12 }}>
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
                  <Grid size={{ xs: 12 }}>
                    <TextFieldBasic
                      required
                      multiline
                      maxLength={254}
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
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              hook.handleSelectAllPermissions(props)
                                .isAllSelected
                            }
                            indeterminate={
                              hook.handleSelectAllPermissions(props)
                                .isIndeterminate
                            }
                            onChange={
                              hook.handleSelectAllPermissions(props)
                                .handleToggleAll
                            }
                            disabled={
                              hook.handleSelectAllPermissions(props).isDisabled
                            }
                            color="primary"
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            sx={{
                              color: hook.theme.palette.text.primary,
                              fontWeight: 500,
                            }}
                          >
                            Seleccionar todos los permisos
                          </Typography>
                        }
                      />
                    </Box>

                    <AutocompleteComponent
                      multiple
                      required
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
                        props.touched.permission_id &&
                        props.errors.permission_id
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

                <Box
                  component="div"
                  sx={{
                    mt: 4,
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
                    onClick={() => {
                      onClose();
                      hook.handleCancelForm(props);
                    }}
                  />
                  <ButtonComponent
                    type="submit"
                    text="Guardar"
                    color="success"
                    position="left"
                    icon={<FiSave />}
                    variant="contained"
                    loading={props.isSubmitting}
                    disabled={
                      !props.isValid || !props.dirty || props.isSubmitting
                    }
                  />
                </Box>
              </Paper>
            </Form>
          )}
        </Formik>
      </DialogComponent.Body>
    </DialogComponent>
  );
}

export default CreateRoleModal;
