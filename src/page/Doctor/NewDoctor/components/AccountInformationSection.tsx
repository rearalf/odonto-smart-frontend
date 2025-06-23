import {
  Box,
  Grid,
  Card,
  Paper,
  alpha,
  useTheme,
  Typography,
  CardContent,
} from '@mui/material';
import { FiLock, FiUsers, FiShield, FiKey } from 'react-icons/fi';
import { AutocompleteComponent, TextFieldBasic } from '@components/index';
import type { FormikProps } from 'formik';
import type { IFormValues } from '../types/newDoctor.types';
import type { IBasicIdNameDescription } from 'src/types/common.types';
import type { IAutocompleteOption } from 'src/types/AutocompleteComponent.type';

interface IAccountInformationSectionProps {
  formikProps: FormikProps<IFormValues>;
  hookValue: {
    isLoadingRole: boolean;
    isLoadingPermission: boolean;
    isShowPassword: boolean;
    isShowConfirmPassword: boolean;
    handleShowPassword: () => void;
    handleShowConfirmPassword: () => void;
    roles: IBasicIdNameDescription[];
    permissions: IBasicIdNameDescription[];
  };
}

const AccountInformationSection = ({
  formikProps,
  hookValue,
}: IAccountInformationSectionProps) => {
  const theme = useTheme();

  // Obtener permisos seleccionados
  const selectedPermissions = hookValue.permissions.filter(
    (permission: IBasicIdNameDescription) =>
      formikProps.values.person.user.permission_ids?.includes(permission.id),
  );

  const selectedRoles = hookValue.roles.filter(
    (role: IBasicIdNameDescription) =>
      formikProps.values.person.user.role_ids?.includes(role.id),
  );

  const convertToAutocompleteOptions = (
    items: IBasicIdNameDescription[],
    permissions?: boolean,
  ): IAutocompleteOption[] => {
    if (permissions) {
      return items.map((item) => ({
        id: item.id,
        label: item.label || item.name,
        name: item.label || item.name,
        description: item.description,
      }));
    }
    return items.map((item) => ({
      id: item.id,
      label: item.name,
      name: item.name,
      description: item.description,
    }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FiLock
          size={24}
          color={theme.palette.primary.main}
          style={{ marginRight: 8 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Información de Cuenta y Accesos
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Credenciales de Acceso */}
        <Grid size={12}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: alpha(theme.palette.info.main, 0.04),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <FiKey
                  size={20}
                  color={theme.palette.info.main}
                  style={{ marginRight: 8 }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.info.main,
                  }}
                >
                  Credenciales de Acceso
                </Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid size={12}>
                  <TextFieldBasic
                    required
                    type="text"
                    id="person.user.email"
                    label="Correo electrónico"
                    autoComplete="email"
                    placeholder="doctor@clinica.com"
                    value={formikProps.values.person.user.email}
                    disabled={formikProps.isSubmitting}
                    onChange={formikProps.handleChange}
                    handleOnBlur={() => {
                      formikProps.setFieldTouched('person.user.email', true);
                      formikProps.validateField('person.user.email');
                    }}
                    helperText={
                      formikProps.touched.person?.user?.email
                        ? formikProps.errors.person?.user?.email
                        : 'Este email será usado para iniciar sesión en el sistema'
                    }
                    error={
                      formikProps.touched.person?.user?.email &&
                      Boolean(formikProps.errors.person?.user?.email)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextFieldBasic
                    required
                    type="password"
                    label="Contraseña"
                    id="person.user.password"
                    autoComplete="new-password"
                    placeholder="Mínimo 8 caracteres"
                    disabled={formikProps.isSubmitting}
                    value={formikProps.values.person.user.password}
                    onChange={formikProps.handleChange}
                    showPassword={hookValue.isShowPassword}
                    handleShowPassword={hookValue.handleShowPassword}
                    handleOnBlur={() => {
                      formikProps.setFieldTouched('person.user.password', true);
                      formikProps.validateField('person.user.password');
                    }}
                    helperText={
                      formikProps.touched.person?.user?.password
                        ? formikProps.errors.person?.user?.password
                        : 'Use mayúsculas, minúsculas, números y símbolos'
                    }
                    error={
                      formikProps.touched.person?.user?.password &&
                      Boolean(formikProps.errors.person?.user?.password)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextFieldBasic
                    required
                    type="password"
                    autoComplete="new-password"
                    label="Confirmar contraseña"
                    id="person.user.confirmPassword"
                    placeholder="Repita la contraseña"
                    disabled={formikProps.isSubmitting}
                    onChange={formikProps.handleChange}
                    value={formikProps.values.person.user.confirmPassword}
                    showPassword={hookValue.isShowConfirmPassword}
                    handleShowPassword={hookValue.handleShowConfirmPassword}
                    handleOnBlur={() => {
                      formikProps.setFieldTouched(
                        'person.user.confirmPassword',
                        true,
                      );
                      formikProps.validateField('person.user.confirmPassword');
                    }}
                    helperText={
                      formikProps.touched.person?.user?.confirmPassword
                        ? formikProps.errors.person?.user?.confirmPassword
                        : ''
                    }
                    error={
                      formikProps.touched.person?.user?.confirmPassword &&
                      Boolean(formikProps.errors.person?.user?.confirmPassword)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Roles del Sistema */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: alpha(theme.palette.warning.main, 0.03),
              border: `1px solid ${alpha(theme.palette.warning.main, 0.15)}`,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FiUsers
                  size={20}
                  color={theme.palette.warning.main}
                  style={{ marginRight: 8 }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.warning.main,
                  }}
                >
                  Roles del Sistema
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 2.5,
                }}
              >
                Asigne los roles que definirán las funcionalidades principales
                del doctor.
              </Typography>

              <AutocompleteComponent
                multiple
                required
                fullWidth
                loading={hookValue.isLoadingRole}
                id="person.user.role_ids"
                placeholder="Seleccionar roles..."
                options={convertToAutocompleteOptions(hookValue.roles)}
                value={convertToAutocompleteOptions(selectedRoles)}
                onChange={(newValue) => {
                  const roleIds = newValue.map((specialty) => specialty.id);
                  formikProps.setFieldValue('person.user.role_ids', roleIds);
                }}
                helperText={
                  formikProps.touched.person?.user?.role_ids
                    ? formikProps.errors.person?.user?.role_ids
                    : undefined
                }
                onBlur={() => {
                  formikProps.setFieldTouched('person.user.role_ids', true);
                  formikProps.validateField('person.user.role_ids');
                }}
                error={
                  formikProps.touched.person &&
                  formikProps.touched.person.user &&
                  formikProps.touched.person.user.role_ids &&
                  Boolean(
                    formikProps.errors.person &&
                      formikProps.errors.person.user &&
                      formikProps.errors.person.user.role_ids,
                  )
                }
                disabled={formikProps.isSubmitting}
              />

              {/* Info de roles seleccionados */}
              {selectedRoles.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    Roles seleccionados: {selectedRoles.length}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Permisos Específicos */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: alpha(theme.palette.error.main, 0.03),
              border: `1px solid ${alpha(theme.palette.error.main, 0.15)}`,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FiShield
                  size={20}
                  color={theme.palette.error.main}
                  style={{ marginRight: 8 }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.error.main,
                  }}
                >
                  Permisos Específicos
                  <Typography variant="caption"> (Opcional)</Typography>
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 2.5,
                }}
              >
                Configure permisos granulares adicionales a los roles asignados.
              </Typography>

              <AutocompleteComponent
                multiple
                required
                fullWidth
                loading={hookValue.isLoadingPermission}
                id="person.user.permission_ids"
                placeholder="Seleccionar permisos..."
                options={convertToAutocompleteOptions(
                  hookValue.permissions,
                  true,
                )}
                value={convertToAutocompleteOptions(selectedPermissions, true)}
                onChange={(newValue) => {
                  const permissionIds = newValue.map(
                    (permission) => permission.id,
                  );
                  formikProps.setFieldValue(
                    'person.user.permission_ids',
                    permissionIds,
                  );
                }}
                helperText={
                  formikProps.touched.person?.user?.permission_ids
                    ? formikProps.errors.person?.user?.permission_ids
                    : undefined
                }
                onBlur={() => {
                  formikProps.setFieldTouched(
                    'person.user.permission_ids',
                    true,
                  );
                  formikProps.validateField('person.user.permission_ids');
                }}
                error={
                  formikProps.touched.person &&
                  formikProps.touched.person.user &&
                  formikProps.touched.person.user.permission_ids &&
                  Boolean(
                    formikProps.errors.person &&
                      formikProps.errors.person.user &&
                      formikProps.errors.person.user.permission_ids,
                  )
                }
                disabled={formikProps.isSubmitting}
              />

              {/* Info de permisos seleccionados */}
              {selectedPermissions.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    Permisos seleccionados: {selectedPermissions.length}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountInformationSection;
