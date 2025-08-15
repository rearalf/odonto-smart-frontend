import { Box, type Theme, Typography } from '@mui/material';
import { FiTrash } from 'react-icons/fi';

import DialogComponent from './DialogComponent';
import ButtonComponent from './ButtonComponent';
import alphaStyles from '@utils/alphaStyles.utils';

interface IDeleteDialog {
  theme: Theme;
  title: string;
  description: string;
  openDeleteModal: boolean;
  handleDeleteAction: () => void;
  handleShowDeleteModal: () => void;
}

const DeleteDialog = (props: IDeleteDialog) => (
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
          backgroundColor: alphaStyles(props.theme.palette.error.main, 0.1),
        }}
      >
        <FiTrash size={36} color={props.theme.palette.error.main} />
      </Box>
      <Typography variant="h6" component="h2" color="textPrimary">
        {props.title}
      </Typography>
      <Typography align="center" color="textSecondary">
        {props.description}
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
          onClick={props.handleDeleteAction}
        />
      </Box>
    </Box>
  </DialogComponent>
);

export default DeleteDialog;
