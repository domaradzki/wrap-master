import React from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

interface StepButtonsProps {
  steps: { id: number; stepName: string }[];
  activeStep: number;
  handleBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddOrder: (event: any) => void;
  router: { back: () => void };
  closeModal: () => void;
}

const StepButtons: React.FC<StepButtonsProps> = ({
  steps,
  activeStep,
  handleBack,
  handleAddOrder,
  closeModal,
}) => {
  return (
    <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
      {activeStep === steps.length - 1 ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4, marginLeft: 1 }}
          onClick={handleAddOrder}
        >
          Potwierdź
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2, marginLeft: 1 }}
        >
          Dalej
        </Button>
      )}
      {activeStep !== 0 ? (
        <Button onClick={handleBack} sx={{ marginTop: 2, marginLeft: 1 }}>
          Powrót
        </Button>
      ) : (
        <Button
          onClick={closeModal}
          sx={{ marginTop: 2, marginLeft: 1 }}
          variant="outlined"
        >
          Anuluj
        </Button>
      )}
    </Stack>
  );
};

export default StepButtons;
