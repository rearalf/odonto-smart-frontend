import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { Formik } from 'formik';

import { BreadCrumbs } from '@components/index';
import useNewDoctor from './useNewDoctor';
import FormStepTwo from './components/FormStepTwo';
import FormStepOne from './components/FormStepOne';

import './styles.css';
import { breadCrumbs, steps } from './constants/newDoctor';
import { doctorInitialValues } from './validation/newDoctor.schema';

function NewDoctor() {
  const hook = useNewDoctor();
  return (
    <Box component="div" className="new-doctor">
      <BreadCrumbs links={breadCrumbs} loading={false} />

      <header className="header">
        <h1>Nuevo doctor</h1>
      </header>

      <Stepper activeStep={hook.activeStep} className="steps-components">
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
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
        onSubmit={(_values, formikHelpers) => {
          formikHelpers.setSubmitting(true);
        }}
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
            ) : (
              <FormStepTwo
                formikProps={props}
                specialties={hook.specialties}
                specialtiesBySelect={hook.specialtiesBySelect}
                handleSetSpecialtiesBySelect={hook.handleSetSpecialtiesBySelect}
              />
            )}
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
                disabled={!props.isValid || !props.dirty}
                onClick={(e) =>
                  hook.activeStep === steps.length - 1
                    ? e.preventDefault()
                    : hook.handleNextStep(props)
                }
                type={
                  hook.activeStep === steps.length - 1 ? 'submit' : 'button'
                }
              >
                {hook.activeStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
              </Button>
            </div>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default NewDoctor;
