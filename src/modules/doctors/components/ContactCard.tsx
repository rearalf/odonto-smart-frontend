import { Box, Grid, Typography, IconButton } from '@mui/material';
import { FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import type { IContactCardProps } from '../types/newDoctor.types';
import { CONTACT_TYPE_ENUM } from 'src/modules/shared/types/common.types';
import useContactCard from '../hooks/useContactCard';

const ContactCard = (props: IContactCardProps) => {
  const hook = useContactCard(props);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={props.index}>
      <Box sx={hook.cardContainerStyles}>
        <Box sx={hook.contentStyles}>
          <Box sx={hook.contactTypeStyles}>
            {props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL ? (
              <FiMail size={20} color={hook.theme.palette.info.main} />
            ) : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE ? (
              <FiPhone size={20} color={hook.theme.palette.secondary.main} />
            ) : (
              <FaWhatsapp size={20} color={hook.theme.palette.success.main} />
            )}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={hook.typographyTypeStyles}>
              {props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL
                ? 'Correo'
                : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE
                  ? 'Teléfono'
                  : 'WhatsApp'}
            </Typography>
            <Typography variant="body2" sx={hook.typographyContactStyles}>
              {props.contact.contact_value || 'Sin especificar'}
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="error"
            disabled={props.formikProps.isSubmitting}
            onClick={hook.handleDeleteContact}
            sx={hook.deleteButtonStyles}
          >
            <FiTrash2 size={16} />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default ContactCard;
