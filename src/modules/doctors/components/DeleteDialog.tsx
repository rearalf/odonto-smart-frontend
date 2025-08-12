import { Box, type Theme, Typography } from '@mui/material';
import { FiTrash } from 'react-icons/fi';

import ButtonComponent from 'src/modules/shared/components/ButtonComponent';
import DialogComponent from 'src/modules/shared/components/DialogComponent';

interface IDeleteDialog {
  theme: Theme;
  openDeleteModal: boolean;
  handleDeleteDoctor: () => void;
  handleShowDeleteModal: () => void;
  alphafunction: (color: string, opacity: number) => string;
}

const DeleteDialog = (props: IDeleteDialog) => {
  return (
    <DialogComponent
      fullWidth
      maxWidth="xs"
      describedby="Ventana de advertencia para eliminar un doctor de forma permanente"
      labelledby="delete-doctor-dialog-title"
      open={props.openDeleteModal}
      handleClose={props.handleShowDeleteModal}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            p: 2,
            mb: 3,
            display: 'flex',
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.alphafunction(
              props.theme.palette.error.main,
              0.1,
            ),
          }}
        >
          <FiTrash size={36} color={props.theme.palette.error.main} />
        </Box>
        <Typography variant="h6" component="h2" color="textPrimary">
          Eliminar el doctor
        </Typography>
        <Typography align="center" color="textSecondary">
          ¿Seguro que quiere eliminar al doctor? Esta acción no se puede
          deshacer.
        </Typography>
        <Box
          sx={{
            mt: 4,
            gap: 4,
            display: 'flex',
          }}
        >
          <ButtonComponent
            color="inherit"
            text="Cancelar"
            variant="contained"
            onClick={props.handleShowDeleteModal}
          />
          <ButtonComponent
            color="error"
            text="Confirmar"
            variant="contained"
            onClick={props.handleDeleteDoctor}
          />
        </Box>
      </Box>
    </DialogComponent>
  );
};

export default DeleteDialog;
