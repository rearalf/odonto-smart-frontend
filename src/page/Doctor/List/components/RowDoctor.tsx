import { LiaNotesMedicalSolid } from 'react-icons/lia';
import { FiEdit, FiTrash } from 'react-icons/fi';
import {
  Chip,
  Stack,
  Tooltip,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from '@mui/material';

import type { IListDoctors } from 'src/types/doctor.type';

interface IRowDoctor {
  doctors: IListDoctors[];
  handleShowDeleteModal: (id: number) => void;
}

const RowDoctor = (props: IRowDoctor) => {
  return props.doctors.map((row) => (
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
          <IconButton
            color="error"
            onClick={() => props.handleShowDeleteModal(row.id)}
          >
            <FiTrash title="Eliminar doctor" size={18} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));
};

export default RowDoctor;
