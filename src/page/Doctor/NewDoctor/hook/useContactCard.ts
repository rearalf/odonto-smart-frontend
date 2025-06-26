import { CONTACT_TYPE_ENUM } from 'src/types/common.types';
import type { IContactCardProps } from '../types/newDoctor.types';
import useStyles from './useStyles';

function useContactCard(props: IContactCardProps) {
  const styles = useStyles();

  const cardContainerStyles = {
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
  };

  const contentStyles = {
    display: 'flex',
    gap: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contactTypeStyles = {
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
  };

  const typographyTypeStyles = {
    color: styles.theme.palette.text.secondary,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  };

  const typographyContactStyles = {
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const deleteButtonStyles = {
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
      backgroundColor: styles.alphafunction(
        styles.theme.palette.error.main,
        0.08,
      ),
    },
  };

  const handleDeleteContact = () => {
    const newContacts = [...props.formikProps.values.person.personContact];
    newContacts.splice(props.index, 1);
    props.formikProps.setFieldValue('person.personContact', newContacts);
  };

  return {
    contentStyles,
    contactTypeStyles,
    deleteButtonStyles,
    theme: styles.theme,
    cardContainerStyles,
    typographyTypeStyles,
    typographyContactStyles,
    handleDeleteContact,
  };
}

export default useContactCard;
