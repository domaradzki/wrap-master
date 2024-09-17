import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const CheckoutStepper = ({
  steps,
  activeStep,
}: {
  steps: { id: number; stepName: string }[];
  activeStep: number;
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{ padding: (theme) => theme.spacing(3, 0, 5) }}
    >
      {steps.map((step) => (
        <Step key={step.id}>
          <StepLabel>{step.stepName}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutStepper;
