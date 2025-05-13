import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { FiEdit, FiTrash, FiUser } from 'react-icons/fi';
import { LiaNotesMedicalSolid } from 'react-icons/lia';
import { Link } from 'react-router';

import {
  BreadCrumbs,
  TableComponent,
  DialogComponent,
} from '@components/index';
import useListDoctor from './useListDoctor';

import './styles.css';

function Doctor() {
  const hook = useListDoctor();
  return (
    <div className="list-doctor">
      <BreadCrumbs links={hook.breadCrumbs} loading={false} />

      <header className="header">
        <h1>Doctores</h1>
        <Link to="new-doctor">
          <Button variant="contained" type="button" className="btn">
            <LiaNotesMedicalSolid size={20} /> Nuevo doctor
          </Button>
        </Link>
      </header>

      <TableComponent
        key="doctor"
        ariaLabelTable="doctores"
        handleSetPage={hook.handleSetPage}
        handleSetRowsPerPage={hook.handleSetRowsPerPage}
        page={hook.page}
        rowsPerPage={hook.rowsPerPage}
        totalData={hook.doctor.length}
        header={
          <>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="center">Especialidad</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">Roles</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </>
        }
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
      ></TableComponent>

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
    </div>
  );
}

export default Doctor;
