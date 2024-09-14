import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const CheckoutStepper = ({
  steps,
  activeStep,
}: {
  steps: string[];
  activeStep: number;
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{ padding: (theme) => theme.spacing(3, 0, 5) }}
    >
      {steps.map(
        (
          label:
            | boolean
            | React.Key
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.PromiseLikeOfReactNode
            | null
            | undefined
        ) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
};

export default CheckoutStepper;
