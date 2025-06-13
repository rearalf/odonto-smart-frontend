import { Box, Button, IconButton, TableCell, TableRow } from '@mui/material';
import { FiTrash } from 'react-icons/fi';
import { Formik } from 'formik';

import type { IFormStepTwoProps } from '../types/newDoctor.types';
import type { MuiTelInputInfo } from 'mui-tel-input';

import {
  TableComponent,
  TextFieldBasic,
  TelInputComponent,
  RadioButtonComponent,
  TransferListComponent,
} from '@components/index';

import {
  contactInitialValues,
  contactSchema,
} from '../validation/newDoctor.schema';
import { CONTACT_TYPE } from '../constants/newDoctor';

const FormStepTwo = (props: IFormStepTwoProps) => {
  return (
    <Box component="div" className="form-step-2">
      <Box component="div" className="first-part">
        <TransferListComponent
          items={props.specialties}
          leftIds={props.specialtiesBySelect}
          isLoading={props.isLoadingSpecialty}
          rightIds={props.formikProps.values.specialty_ids}
          onChange={(newLeftIds, newRightIds) => {
            props.handleSetSpecialtiesBySelect(newLeftIds);
            props.formikProps.setFieldValue('specialty_ids', newRightIds);
          }}
        />
      </Box>
      <Formik
        initialValues={contactInitialValues}
        validationSchema={contactSchema}
        onSubmit={(values, formikHelpers) => {
          const newArray = [...props.formikProps.values.person_contact, values];
          props.formikProps.setFieldValue('person_contact', newArray);
          formikHelpers.resetForm();
          formikHelpers.setSubmitting(true);
        }}
      >
        {(formikProps) => (
          <Box component="div" className="second-part">
            <Box component="div" className="form-part">
              <RadioButtonComponent
                row
                id="contact_type"
                options={CONTACT_TYPE}
                label="Tipo de contacto"
                value={formikProps.values.contact_type}
                onChange={(e) => {
                  formikProps.setFieldValue('contact_value', '');
                  formikProps.setFieldValue('contact_type', e.target.value);
                }}
              />
              {formikProps.values.contact_type === 'PHONE' ||
              formikProps.values.contact_type === 'WHATSAPP' ? (
                <TelInputComponent
                  label="Celular"
                  ariaLabel="Ingresa número celular"
                  value={formikProps.values.contact_value}
                  handleChange={(_value: string, info: MuiTelInputInfo) => {
                    formikProps.setFieldValue(
                      'contact_value',
                      info.nationalNumber,
                    );
                  }}
                  handleOnBlur={() => {
                    formikProps.setFieldTouched('contact_value', true);
                    formikProps.validateField('contact_value');
                  }}
                  helperText={
                    formikProps.touched.contact_value &&
                    formikProps.errors.contact_value
                      ? formikProps.errors.contact_value
                      : ''
                  }
                  error={
                    formikProps.touched.contact_value &&
                    Boolean(formikProps.errors.contact_value)
                  }
                />
              ) : (
                formikProps.values.contact_type === 'EMAIL' && (
                  <TextFieldBasic
                    id="email"
                    type="email"
                    label="Correo"
                    autoComplete="email"
                    placeholder="correo@gmail.com"
                    value={formikProps.values.contact_value}
                    onChange={(e) => {
                      formikProps.setFieldValue(
                        'contact_value',
                        e.target.value,
                      );
                    }}
                    handleOnBlur={() => {
                      formikProps.setFieldTouched('contact_value', true);
                      formikProps.validateField('contact_value');
                    }}
                    helperText={
                      formikProps.touched.contact_value &&
                      formikProps.errors.contact_value
                        ? formikProps.errors.contact_value
                        : ''
                    }
                    error={
                      formikProps.touched.contact_value &&
                      Boolean(formikProps.errors.contact_value)
                    }
                  />
                )
              )}
              <Button
                variant="contained"
                disabled={!formikProps.isValid || !formikProps.dirty}
                onClick={formikProps.submitForm}
                type="submit"
              >
                Agregar
              </Button>
            </Box>
            <div className="table-contact">
              <TableComponent
                key="doctor"
                paginacion={false}
                ariaLabelTable="doctores"
                handleSetPage={(_newPage: number) => {}}
                handleSetRowsPerPage={(_value: number) => {}}
                page={1}
                rowsPerPage={15}
                totalData={20}
                header={
                  <>
                    <TableCell align="center">Tipo de contacto</TableCell>
                    <TableCell align="center">Contacto</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </>
                }
                body={
                  props.formikProps.values.person_contact.length > 0 ? (
                    props.formikProps.values.person_contact.map(
                      (contact, i) => (
                        <TableRow hover key={i}>
                          <TableCell align="center">
                            {contact.contact_type}
                          </TableCell>
                          <TableCell align="center">
                            {contact.contact_value}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton color="error" title="Eliminar usuario">
                              <FiTrash title="Eliminar contacto" size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  ) : (
                    <TableRow hover>
                      <TableCell align="center" colSpan={3}>
                        No hay contactos
                      </TableCell>
                    </TableRow>
                  )
                }
              ></TableComponent>
            </div>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default FormStepTwo;
