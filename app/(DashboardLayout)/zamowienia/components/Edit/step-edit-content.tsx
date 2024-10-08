import React from "react";
import { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";
import { DocumentSchema } from "@/schemas/document";
import { z } from "zod";
import StepEditDocumentForm from "./step-edit-document-form";
import StepEditTapeForm from "./step-edit-tape-form";
import StepEditStretchForm from "./step-edit-stretch-form";
import StepEditProductForm from "./step-edit-product-form";
import StepEditReview from "./step-edit-review";

interface StepEditContentProps {
  step: number;
  document: z.infer<typeof DocumentSchema>;
  stepsLength: number;
  handleDocumentChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string | number>
  ) => void;
  handleOrderChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string | number>
  ) => void;
  handleProductChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string | number>
  ) => void;
  handleTapeChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string | number>
  ) => void;
  handleStretchChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string | number>
  ) => void;
  handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsertDateChange: (value: Dayjs) => void;
  handleRealisationDateChange: (value: Dayjs) => void;
  handleAcceptationnDateChange: (value: Dayjs) => void;
}

const StepEditContent = ({
  step,
  stepsLength,
  document,
  handleDocumentChange,
  handleOrderChange,
  handleProductChange,
  handleTapeChange,
  handleStretchChange,
  handleInsertDateChange,
  handleRealisationDateChange,
  handleAcceptationnDateChange,
  handleChangeFile,
}: StepEditContentProps) => {
  if (step === 0) {
    return (
      <StepEditDocumentForm
        document={document}
        handleDocumentChange={handleDocumentChange}
        handleInsertDateChange={handleInsertDateChange}
      />
    );
  } else if (step > 0 && step < stepsLength - 1) {
    if (
      document.orders[step - 1].product.productCode === "TPD" ||
      document.orders[step - 1].product.productCode == "TPD32"
    ) {
      return (
        <StepEditTapeForm
          order={document.orders[step - 1]}
          handleOrderChange={(event) =>
            handleOrderChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleProductChange={(event) =>
            handleProductChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleTapeChange={(event) =>
            handleTapeChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleRealisationDateChange={handleRealisationDateChange}
          handleAcceptationnDateChange={handleAcceptationnDateChange}
          handleChangeFile={handleChangeFile}
        />
      );
    }
    if (
      document.orders[step - 1].product.productCode === "FSM" ||
      document.orders[step - 1].product.productCode == "FSMG" ||
      document.orders[step - 1].product.productCode == "FSRG"
    ) {
      return (
        <StepEditStretchForm
          order={document.orders[step - 1]}
          handleOrderChange={(event) =>
            handleOrderChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleProductChange={(event) =>
            handleProductChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleStretchChange={(event) =>
            handleStretchChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleRealisationDateChange={handleRealisationDateChange}
        />
      );
    } else {
      return (
        <StepEditProductForm
          order={document.orders[step - 1]}
          handleOrderChange={(event) =>
            handleOrderChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleProductChange={(event) =>
            handleProductChange(
              event as
                | React.ChangeEvent<
                    HTMLInputElement | { name?: string; value: unknown }
                  >
                | SelectChangeEvent<string>
            )
          }
          handleRealisationDateChange={handleRealisationDateChange}
        />
      );
    }
  }
  if (step === stepsLength - 1) {
    return <StepEditReview document={document} />;
  } else return <></>;
};

export default StepEditContent;
