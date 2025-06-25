import { FiEdit, FiTrash, FiUser } from 'react-icons/fi';
import { LiaNotesMedicalSolid } from 'react-icons/lia';
import {
  Box,
  Button,
  IconButton,
  TableCell,
  TableRow,
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
        <Typography variant="h4" component="h1" sx={styles.h1Styles}>
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
        rowsPerPage={hook.rowsPerPage}
        totalData={hook.doctor.length}
        emptyMessage="No hay doctores registrados"
        headers={[
          { title: 'Nombre', key: 'fullName' },
          { title: 'Especialidad', key: 'speacilty', align: 'center' },
          { title: 'Correo', key: 'email', align: 'center' },
          { title: 'Roles', key: 'rols', align: 'center' },
          { title: 'Acciones', key: 'actions', align: 'center' },
        ]}
        body={hook.doctor.map((row) => (
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
                  <IconButton color="info" title="Información usuario">
                    <FiUser title="Información usuario" size={18} />
                  </IconButton>
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
