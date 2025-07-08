import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { LiaNotesMedicalSolid } from 'react-icons/lia';
import { Link } from 'react-router';
import type { IListRoles } from 'src/types/role.type';

interface IRowRoleProps {
  roles: IListRoles[];
}

const RowRole = (props: IRowRoleProps) => {
  return props.roles.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.description}</TableCell>

      <TableCell align="center">
        <Tooltip title="Información rol">
          <IconButton color="info">
            <LiaNotesMedicalSolid size={22} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Editar rol">
          <Link to={`/rol/${row.id}`}>
            <IconButton color="secondary">
              <FiEdit title="Editar rol" size={18} />
            </IconButton>
          </Link>
        </Tooltip>

        <Tooltip title="Eliminar rol">
          <IconButton color="error">
            <FiTrash title="Eliminar rol" size={18} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));
};

export default RowRole;
