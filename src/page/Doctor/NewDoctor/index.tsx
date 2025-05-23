import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';

import { BreadCrumbs } from '@components/index';
import useNewDoctor from './useNewDoctor';
import FormStepTwo from './components/FormStepTwo';
import FormStepOne from './components/FormStepOne';

import { doctorInitialValues } from './validation/newDoctor.schema';
import { BREADCRUMBS, STEPS } from './constants/newDoctor';
import './styles.css';

function NewDoctor() {
  const hook = useNewDoctor();
  return (
    <Box component="div" className="new-doctor">
      <BreadCrumbs links={BREADCRUMBS} loading={false} />

      <header className="header">
        <h1>Nuevo doctor</h1>
      </header>

      <Stepper activeStep={hook.activeStep} className="steps-components">
        {STEPS.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (hook.isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            );
          }

          if (hook.isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Formik
        initialValues={doctorInitialValues}
        validationSchema={hook.getValidationSchema(hook.activeStep)}
        onSubmit={(_values, formikHelpers) => formikHelpers.setSubmitting(true)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <Box component="form" className="form" onSubmit={props.handleSubmit}>
            {hook.activeStep === 0 ? (
              <FormStepOne
                formikProps={props}
                specialties={hook.specialties}
                isShowPassword={hook.isShowPassword}
                isShowConfirmPassword={hook.isShowConfirmPassword}
                handleShowPassword={hook.handleShowPassword}
                handleShowConfirmPassword={hook.handleShowConfirmPassword}
              />
            ) : hook.activeStep === 1 ? (
              <FormStepTwo
                formikProps={props}
                contact={hook.contact}
                contactType={hook.contactType}
                specialties={hook.specialties}
                isLoadingSpecialty={hook.isLoadingSpecialty}
                handleSetContactTyp={hook.handleSetContactTyp}
                specialtiesBySelect={hook.specialtiesBySelect}
                handleSetContactPhone={hook.handleSetContactPhone}
                handleSetContactEmail={hook.handleSetContactEmail}
                handleSetSpecialtiesBySelect={hook.handleSetSpecialtiesBySelect}
              />
            ) : null}
            <div className="btn-group">
              <Button
                color="inherit"
                type="button"
                variant="text"
                aria-label="Regresar"
                disabled={hook.activeStep === 0}
                onClick={hook.handlePrevStep}
              >
                Regresar
              </Button>

              <Button
                color="primary"
                variant="contained"
                disabled={hook.handleValidateDisableButton(
                  props.isValid,
                  props.dirty,
                )}
                onClick={(e) => hook.handleNextStep(props, e)}
                type={
                  hook.activeStep === STEPS.length - 1 ? 'submit' : 'button'
                }
              >
                {hook.activeStep === STEPS.length - 1 ? 'Guardar' : 'Siguiente'}
              </Button>
            </div>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default NewDoctor;
