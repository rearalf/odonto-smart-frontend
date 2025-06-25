import { Box, Grid, Typography, IconButton } from '@mui/material';
import { FiMail, FiPhone, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { FormikProps } from 'formik';

import { CONTACT_TYPE_ENUM, type IContactForm } from 'src/types/common.types';
import type { IFormValues } from '../types/newDoctor.types';
import useStyles from '../hook/useStyles';

interface IContactCardProps {
  contact: IContactForm;
  key: number;
  formikProps: FormikProps<IFormValues>;
}

const ContactCard = (props: IContactCardProps) => {
  const styles = useStyles();

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={props.key}>
      <Box
        sx={{
          ...styles.boxContactCardStyles,
          '&:hover': {
            borderColor:
              props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL
                ? styles.theme.palette.info.main
                : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE
                  ? styles.theme.palette.secondary.main
                  : styles.theme.palette.success.main,
            boxShadow: `0 2px 8px ${styles.alphafunction(styles.theme.palette.success.main, 0.15)}`,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: styles.alphafunction(
                props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL
                  ? styles.theme.palette.info.main
                  : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE
                    ? styles.theme.palette.secondary.main
                    : styles.theme.palette.success.main,
                0.1,
              ),
            }}
          >
            {props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL ? (
              <FiMail size={20} color={styles.theme.palette.info.main} />
            ) : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE ? (
              <FiPhone size={20} color={styles.theme.palette.secondary.main} />
            ) : (
              <FaWhatsapp size={20} color={styles.theme.palette.success.main} />
            )}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{
                color: styles.theme.palette.text.secondary,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL
                ? 'Correo'
                : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE
                  ? 'Teléfono'
                  : 'WhatsApp'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {props.contact.contact_value || 'Sin especificar'}
            </Typography>
          </Box>
          <IconButton
            size="small"
            color="error"
            disabled={props.formikProps.isSubmitting}
            onClick={() => {
              const newContacts = [
                ...props.formikProps.values.person.personContact,
              ];
              newContacts.splice(props.key, 1);
              props.formikProps.setFieldValue(
                'person.personContact',
                newContacts,
              );
            }}
            sx={{
              opacity: 0.7,
              '&:hover': {
                opacity: 1,
                backgroundColor: styles.alphafunction(
                  styles.theme.palette.error.main,
                  0.08,
                ),
              },
            }}
          >
            <FiTrash2 size={16} />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
};

export default ContactCard;
