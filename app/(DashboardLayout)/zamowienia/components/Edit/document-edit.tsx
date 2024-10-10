import { Typography, Paper, SelectChangeEvent } from "@mui/material";
import { Fragment, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";

import CheckoutStepper from "../stepper";
import StepEditContent from "./step-edit-content";
import StepSuccess from "../step-success";
import StepButtons from "../step-buttons";

import { DocumentSchema } from "@/schemas/document";
import { editDocumentWithItems } from "@/actions/edit-document-with-items";

interface DocumentEditProps {
  document: z.infer<typeof DocumentSchema>;
  onClose: () => void;
}

type stepsKeys = {
  [key: string]: string;
};

const stepsLegend: stepsKeys = {
  TW: "Towar",
  TPD: "Taśma z nadrukiem",
  TPD32: "Taśma z nadrukiem",
  FSM: "Folia Stretch",
  FSMG: "Folia Stretch",
  FSRG: "Folia Stretch",
};

const DocumentEdit = ({
  document,
  //  onSubmit,
  onClose,
}: DocumentEditProps) => {
  const router = useRouter();

  const [activeDocument, setActiveDocument] = useState(document);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const stepsArray = document.orders.map((order) => ({
    stepName: order.product?.productCode,
    id: order.orderId,
  }));

  let steps = stepsArray.map((item) => ({
    id: item.id,
    stepName: stepsLegend[item.stepName],
  }));
  steps = [
    { id: 1, stepName: "Informacje ogólne" },
    ...steps,
    { id: 999, stepName: "Weryfikacja" },
  ];

  const handleDocumentChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number | string>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    setActiveDocument({
      ...activeDocument,
      [name!]: value,
    });
  };

  const handleOrderChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number | string>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    const data = { ...activeDocument };
    (data as any).orders[activeStep - 1][name!] = value;
    setActiveDocument({ ...data });
  };

  const handleProductChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number | string>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    const data = { ...activeDocument };
    (data as any).orders[activeStep - 1].product[name!] = value;
    setActiveDocument({ ...data });
  };

  const handleTapeChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number | string>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    const data = { ...activeDocument };
    (data as any).orders[activeStep - 1].product.tape[name!] = value;
    setActiveDocument({ ...data });
  };

  const handleStretchChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number | string>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    const data = { ...activeDocument };
    (data as any).orders[activeStep - 1].product.stretch[name!] = value;
    setActiveDocument({ ...data });
  };

  const handleInsertDateChange = (value: Dayjs) => {
    setActiveDocument({
      ...activeDocument,
      dateInsert: value.toDate(),
    });
  };

  const handleRealisationDateChange = (value: Dayjs) => {
    const data = { ...activeDocument };
    (data as any).orders[activeStep - 1].product.dateOfRealisation = value;
    setActiveDocument({ ...data });
  };

  const handleAcceptationnDateChange = (value: Dayjs) => {
    const data = { ...activeDocument };
    (data as any).orders[activeStep - 1].product.tape.dateOfAcceptation = value;
    setActiveDocument({ ...data });
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...activeDocument };

    const { files } = event.target;
    if (files) {
      (data as any).orders[activeStep - 1].product.tape.file = files[0];
    }
    setActiveDocument({ ...data });
  };

  const handleNext = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };

  const handleAddOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("activeDocument", activeDocument);
    // const data = JSON.parse(JSON.stringify({ ...input, orders: [...items] }));
    startTransition(() => {
      editDocumentWithItems(activeDocument)
        .then((data) => {
          if (data.error) {
            console.log("Error:", data.error);
            setError(data.error);
            toast.error("Aktualizacja nie powiodła się!");
          }
          if (data.success) {
            console.log("Success:", data.success);
            update();
            setSuccess(data.success);
            toast.success("Aktualizacja zakończona sukcesem!");
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
          setError("Coś poszło nie tak!");
          toast.error("Aktualizacja nie powiodła się!");
        });
    });

    onClose();
  };

  return (
    <Fragment>
      <Paper sx={{ marginBottom: 2, padding: 3 }}>
        <Typography component="h1" variant="h4" align="center">
          Kontrola zamówienia
        </Typography>
        <CheckoutStepper steps={steps} activeStep={activeStep} />
        <Fragment>
          {activeStep === steps.length ? (
            <StepSuccess />
          ) : (
            <form
              onSubmit={handleNext}
              encType="multipart/form-data"
              method="POST"
            >
              <StepEditContent
                step={activeStep}
                stepsLength={steps.length}
                document={activeDocument}
                handleDocumentChange={handleDocumentChange}
                handleOrderChange={handleOrderChange}
                handleProductChange={handleProductChange}
                handleTapeChange={handleTapeChange}
                handleStretchChange={handleStretchChange}
                handleChangeFile={handleChangeFile}
                handleInsertDateChange={handleInsertDateChange}
                handleRealisationDateChange={handleRealisationDateChange}
                handleAcceptationnDateChange={handleAcceptationnDateChange}
              />

              <StepButtons
                steps={steps}
                activeStep={activeStep}
                handleBack={handleBack}
                handleAddOrder={handleAddOrder}
                closeModal={onClose}
                router={router}
              />
            </form>
          )}
        </Fragment>
      </Paper>
    </Fragment>
  );
};

export default DocumentEdit;
