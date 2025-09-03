import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { FiClipboard, FiEdit, FiTrash } from 'react-icons/fi';

interface IRowPatientProps {
  patients: {
    id: number;
    fullName: string;
    age: number;
    phone: string;
  }[];
  handleShowDeleteModal: (id: number) => void;
  handleShowModalDetail: (id: number) => void;
}

const RowPatient = (props: IRowPatientProps) =>
  props.patients.map((row) => (
    <TableRow hover key={row.id}>
      <TableCell align="left">{row.fullName}</TableCell>
      <TableCell align="center">{row.age}</TableCell>
      <TableCell align="center">{row.phone}</TableCell>

      <TableCell align="center">
        <Tooltip title="Información del paciente">
          <IconButton
            color="info"
            onClick={() => props.handleShowModalDetail(row.id)}
          >
            <FiClipboard size={22} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Editar al paciente">
          <IconButton color="secondary">
            <FiEdit title="Editar doctor" size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Eliminar al paciente">
          <IconButton
            color="error"
            onClick={() => props.handleShowDeleteModal(row.id)}
          >
            <FiTrash title="Eliminar paciente" size={18} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));

export default RowPatient;
