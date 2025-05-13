import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { Formik } from 'formik';

import { BreadCrumbs } from '@components/index';
import useNewDoctor from './useNewDoctor';
import FomrStepOne from './FomrStepOne';

import './styles.css';

function NewDoctor() {
  const hook = useNewDoctor();
  return (
    <Box component="div" className="new-doctor">
      <BreadCrumbs links={hook.breadCrumbs} loading={false} />

      <header className="header">
        <h1>Nuevo doctor</h1>
      </header>

      <Stepper activeStep={hook.activeStep} className="steps-components">
        {hook.steps.map((label, index) => {
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
        initialValues={hook.initialValues}
        validationSchema={hook.formSchema}
        onSubmit={(_values, formikHelpers) => {
          formikHelpers.setSubmitting(true);
        }}
      >
        {(props) => (
          <Box component="form" className="form" onSubmit={props.handleSubmit}>
            {hook.activeStep === 0 ? (
              <FomrStepOne
                formikProps={props}
                specialties={hook.specialties}
                isShowPassword={hook.isShowPassword}
                isShowConfirmPassword={hook.isShowConfirmPassword}
                handleShowPassword={hook.handleShowPassword}
                handleShowConfirmPassword={hook.handleShowConfirmPassword}
              />
            ) : null}
            <div className="btn-group">
              <Button
                color="secondary"
                type="button"
                variant="outlined"
                aria-label="Regresar"
                disabled={hook.activeStep === 0}
              >
                Regresar
              </Button>

              <Button
                color="primary"
                variant="contained"
                type={
                  hook.activeStep === hook.steps.length - 1
                    ? 'submit'
                    : 'button'
                }
              >
                {hook.activeStep === hook.steps.length - 1
                  ? 'Guardar'
                  : 'Siguiente'}
              </Button>
            </div>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default NewDoctor;
