import React from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

interface StepButtonsProps {
  steps: string[];
  activeStep: number;
  handleBack: () => void;
  handleAddOrder: () => void;
  router: { back: () => void };
}

const StepButtons: React.FC<StepButtonsProps> = ({
  steps,
  activeStep,
  handleBack,
  handleAddOrder,
  router,
}) => {
  return (
    <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
      {activeStep !== 0 ? (
        <Button onClick={handleBack} sx={{ marginTop: 3, marginLeft: 1 }}>
          Powrót
        </Button>
      ) : (
        <Button
          onClick={() => router.back()}
          sx={{ marginTop: 3, marginLeft: 1 }}
        >
          Anuluj
        </Button>
      )}
      {activeStep === steps.length - 1 ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 3, marginLeft: 1 }}
          onClick={handleAddOrder}
        >
          Potwierdź
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 3, marginLeft: 1 }}
        >
          Dalej
        </Button>
      )}
    </Stack>
  );
};

export default StepButtons;
