import type { Theme } from '@mui/material/styles';
import type { FormikProps } from 'formik';

import { CONTACT_TYPE_ENUM, type IContactForm } from '@type/common.types';
import alphaStyles from '@utils/alphaStyles.utils';
import { paperStylesBase } from '@styles/index';

interface IContactCardStyles<T> {
  formikProps: FormikProps<T>;
  contact: IContactForm;
  themeStyle: Theme;
  index: number;
}

function useContactCard<T extends { personContact: IContactForm[] }>(
  props: IContactCardStyles<T>,
) {
  const cardContainerStyles = {
    ...paperStylesBase(
      props.themeStyle.palette.background.paper,
      props.themeStyle.palette.divider,
    ),
    '&:hover': {
      borderColor:
        props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL
          ? props.themeStyle.palette.info.main
          : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE
            ? props.themeStyle.palette.secondary.main
            : props.themeStyle.palette.success.main,
      boxShadow: `0 2px 8px ${alphaStyles(props.themeStyle.palette.success.main, 0.15)}`,
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
    backgroundColor: alphaStyles(
      props.contact.contact_type === CONTACT_TYPE_ENUM.EMAIL
        ? props.themeStyle.palette.info.main
        : props.contact.contact_type === CONTACT_TYPE_ENUM.PHONE
          ? props.themeStyle.palette.secondary.main
          : props.themeStyle.palette.success.main,
      0.1,
    ),
  };

  const typographyTypeStyles = {
    color: props.themeStyle.palette.text.secondary,
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
      backgroundColor: alphaStyles(props.themeStyle.palette.error.main, 0.08),
    },
  };

  const handleDeleteContact = () => {
    const newContacts = [...props.formikProps.values.personContact];
    newContacts.splice(props.index, 1);
    props.formikProps.setFieldValue('personContact', newContacts);
  };

  return {
    contentStyles,
    contactTypeStyles,
    deleteButtonStyles,
    cardContainerStyles,
    typographyTypeStyles,
    theme: props.themeStyle,
    typographyContactStyles,
    handleDeleteContact,
  };
}

export default useContactCard;
