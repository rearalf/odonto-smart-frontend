import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { FiEdit, FiTrash, FiUser } from 'react-icons/fi';

import { BreadCrumbs, TableComponent } from '@components/index';
import useListDoctor from './useListDoctor';

import './styles.css';

function Doctor() {
  const hook = useListDoctor();
  return (
    <main className="list-doctor">
      <BreadCrumbs links={hook.breadCrumbs} loading={false} />

      <header className="header">
        <h1>Doctores</h1>
        <Button variant="contained" type="button">
          Nuevo doctor
        </Button>
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
          <TableRow key={row.email}>
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
                  <IconButton color="error" title="Eliminar usuario">
                    <FiTrash title="Eliminar usuario" size={18} />
                  </IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      ></TableComponent>
    </main>
  );
}

export default Doctor;
