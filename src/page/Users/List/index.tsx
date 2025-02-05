import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { FiEdit, FiTrash, FiUser, FiUserPlus } from 'react-icons/fi';

import TableComponent from '@components/TableComponent';
import useListUsers from './useListUsers';
import './styles.css';

function Users() {
  const hook = useListUsers();

  return (
    <>
      <header className="header-users">
        <h1>Lista de usuarios</h1>
        <Button variant="contained" startIcon={<FiUserPlus />}>
          Crear usuario
        </Button>
      </header>
      <TableComponent
        handleSetPage={() => {}}
        handleSetRowsPerPage={() => {}}
        page={0}
        rowsPerPage={5}
        ariaLabelTable="Tabla de todos usuarios."
        totalData={hook.users.length}
        header={
          <>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">Roles</TableCell>
            <TableCell align="center">Permisos</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </>
        }
        body={
          <>
            {hook.users.length > 0 &&
              hook.users.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">
                    {row.name + ' ' + row.last_name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.role.length === 0 ? (
                      <p>No posee roles</p>
                    ) : (
                      row.role.map((r) => r.name).join(',')
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.permission.length === 0 ? (
                      <p>No posee permisos</p>
                    ) : (
                      row.permission.map((r) => r.name).join(',')
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
          </>
        }
      />
    </>
  );
}

export default Users;
