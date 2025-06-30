import { FiEdit, FiTrash } from 'react-icons/fi';
import { LiaNotesMedicalSolid } from 'react-icons/lia';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import useListDoctor from './hook/useListDoctor';
import useStyles from './hook/useStyles';
import {
  BreadCrumbs,
  TableComponent,
  DialogComponent,
  ButtonComponent,
} from '@components/index';

function Doctor() {
  const hook = useListDoctor();
  const styles = useStyles();
  return (
    <>
      <BreadCrumbs links={hook.breadCrumbs} loading={false} />

      <Box component="header" sx={styles.headerStyles}>
        <Typography variant="h4" component="h1">
          Doctores
        </Typography>
        <ButtonComponent
          type="button"
          color="primary"
          position="left"
          text="Nuevo doctor"
          variant="contained"
          onClick={hook.handleNewDoctor}
          icon={
            <LiaNotesMedicalSolid
              size={20}
              style={styles.headerIconStyles}
              className="button-icon"
            />
          }
        />
      </Box>

      <TableComponent
        pagination
        key="doctor"
        ariaLabelTable="doctores"
        handleSetPage={hook.handleSetPage}
        handleSetRowsPerPage={hook.handleSetRowsPerPage}
        page={hook.page}
        loading={hook.isLoading}
        rowsPerPage={hook.rowsPerPage}
        totalData={hook.pagination?.total ?? 0}
        emptyMessage="No hay doctores registrados"
        headers={[
          { title: 'Nombre completo', key: 'full_name' },
          { title: 'Correo', key: 'email', align: 'center' },
          {
            title: 'Especialidad principal',
            key: 'specialty',
            align: 'center',
          },
          {
            title: 'Especialidades secundarias',
            key: 'secondary_specialties',
            align: 'center',
          },
          { title: 'Acciones', key: 'actions', align: 'center' },
        ]}
        body={hook.doctors.map((row) => (
          <TableRow hover key={row.email}>
            <TableCell align="left">{row.full_name}</TableCell>

            <TableCell align="center">{row.email}</TableCell>

            <TableCell align="center">{row.specialty.name}</TableCell>

            <TableCell align="center">
              {row.secondary_specialties.length > 0 ? (
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {row.secondary_specialties.slice(0, 2).map((s) => (
                    <Chip
                      key={s.id}
                      label={s.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}

                  {row.secondary_specialties.length > 2 && (
                    <Tooltip
                      title={
                        <Stack spacing={0.5}>
                          {row.secondary_specialties.slice(2).map((s) => (
                            <Typography
                              key={s.id}
                              variant="body2"
                              sx={{ fontSize: '0.75rem' }}
                            >
                              {s.name}
                            </Typography>
                          ))}
                        </Stack>
                      }
                      arrow
                      placement="top"
                    >
                      <Chip
                        label={`+${row.secondary_specialties.length - 2}`}
                        size="small"
                        color="default"
                        variant="outlined"
                      />
                    </Tooltip>
                  )}
                </Stack>
              ) : (
                'Ninguna'
              )}
            </TableCell>

            <TableCell align="center">
              <Tooltip title="Información doctor">
                <IconButton color="info">
                  <LiaNotesMedicalSolid size={22} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar doctor">
                <IconButton color="secondary">
                  <FiEdit title="Editar doctor" size={18} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar doctor">
                <IconButton color="error" onClick={hook.handleShowDeleteModal}>
                  <FiTrash title="Eliminar doctor" size={18} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      />

      <DialogComponent
        fullWidth
        maxWidth="xs"
        titleId="delete-doctor-dialog-title"
        labelledby="delete-doctor-dialog-title"
        dialogTitle="¿Seguro que quiere eliminar al doctor?"
        open={hook.openDeleteModal}
        handleClose={hook.handleShowDeleteModal}
      >
        <DialogComponent.Body>
          <p>
            ¿Estás seguro que deseas continuar? Esta acción no se puede
            deshacer.
          </p>
        </DialogComponent.Body>
        <DialogComponent.Footer>
          <Button
            color="error"
            variant="outlined"
            onClick={hook.handleShowDeleteModal}
          >
            Cancelar
          </Button>
          <Button color="success" variant="contained">
            Confirmar
          </Button>
        </DialogComponent.Footer>
      </DialogComponent>
    </>
  );
}

export default Doctor;
/* 
hook.doctor.map((row) => (
          <TableRow hover key={row.email}>
            <TableCell align="left">{row.fullName}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.specialty}</TableCell>
            <TableCell align="center">
              {row.role.length === 0 ? (
                <p>No posee roles</p>
              ) : (
                row.role.map((r) => r.name).join(',')
              )}
            </TableCell>
            <TableCell align="center">
              {row.role.some((r) => r.name === 'GOD') ? (
                <>
                  <p>No es permitido actuar.</p>
                </>
              ) : (
                <>
                 
                  <IconButton color="secondary" title="Editar usuario">
                    <FiEdit title="Editar usuario" size={18} />
                  </IconButton>
                  <IconButton
                    color="error"
                    title="Eliminar usuario"
                    onClick={hook.handleShowDeleteModal}
                  >
                    <FiTrash title="Eliminar usuario" size={18} />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))
*/
