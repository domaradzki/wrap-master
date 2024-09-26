import React from "react";
import { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";
import StepStretchForm from "./step-stretch-form";
import StepDocumentForm from "./step-document-form";
import StepTapeForm from "./step-tape-form";
import StepProductForm from "./step-product-form";
import StepReview from "./step-review";

export interface Item {
  assortment: string;
  price: number;
  unit: string;
  kind: string;
  type: string;
  productCode: string;
  netValue: number;
  margin?: number;
  dateOfRealisation?: string;
  currency: string;
  product: {
    productCode: string;
  };
  quantity: number;
}
export interface Tape extends Item {
  tapeColor?: string;
  tapeWidth?: number;
  tapeThickness?: number;
  tapeLong?: number;
  roller?: number;
  glue?: string;
  numberOfColors?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  printName?: string;
  dateOfAcceptation?: string;
  file?: File;
}

export interface Stretch extends Item {
  sleeve?: number;
  netWeight?: number;
  grossWeight?: number;
  stretchThickness?: number;
  stretchColor?: string;
}
interface StepContentProps {
  step: number;
  input: any;
  items: Stretch[] | Tape[];
  stepsLength: number;
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => void;
  handleProductChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => void;
  handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsertDateChange: (value: Dayjs) => void;
  handleRealisationDateChange: (value: Dayjs) => void;
  handleAcceptationnDateChange: (value: Dayjs) => void;
}

const StepContent = ({
  step,
  stepsLength,
  input,
  items,
  handleInputChange,
  handleProductChange,
  handleInsertDateChange,
  handleRealisationDateChange,
  handleAcceptationnDateChange,
  handleChangeFile,
}: StepContentProps) => {
  if (step === 0) {
    return (
      <StepDocumentForm
        input={input}
        handleInputChange={handleInputChange}
        handleInsertDateChange={handleInsertDateChange}
      />
    );
  } else if (step > 0 && step < stepsLength - 1) {
    if (
      items[step - 1].productCode === "TPD" ||
      items[step - 1].productCode == "TPD32"
    ) {
      return (
        <StepTapeForm
          item={items[step - 1]}
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
          handleAcceptationnDateChange={handleAcceptationnDateChange}
          handleChangeFile={handleChangeFile}
        />
      );
    }
    if (
      items[step - 1].productCode === "FSM" ||
      items[step - 1].productCode == "FSMG" ||
      items[step - 1].productCode == "FSRG"
    ) {
      return (
        <StepStretchForm
          item={items[step - 1]}
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
    } else {
      return (
        <StepProductForm
          item={items[step - 1]}
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
    return <StepReview document={{ ...input, orders: items }} />;
  }
};

export default StepContent;
