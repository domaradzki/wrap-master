import React from "react";
import { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";
import StepStretchForm from "./step-stretch-form";
import StepDocumentForm from "./step-document-form";
import StepTapeForm from "./step-tape-form";
import StepProductForm from "./step-product-form";
import StepReview from "./step-review";
// import Review from "../../components/Review/Review";

interface Item {
  assortment: string;
  price: number;
  unit: string;
  kind: string;
  type: string;
  productCode: string;
  netValue?: number;
  margin?: number;
  dateOfRealisation?: string;
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
  handleDateChange: (date: Dayjs | null) => void;
  handleDocumentDateChange: (date: Dayjs | null) => void;
  // handleChangeFile?: (file: File) => void;
}

const StepContent = ({
  step,
  stepsLength,
  input,
  items,
  handleInputChange,
  handleProductChange,
  handleDateChange,
  handleDocumentDateChange,
  // handleChangeFile,
}) => {
  if (step === 0) {
    console.log("input", input);
    console.log("items", items);

    return (
      <StepDocumentForm
        input={input}
        handleInputChange={handleInputChange}
        handleDocumentDateChange={(date: Dayjs | null) =>
          handleDocumentDateChange(date)
        }
      />
    );
  } else if (step > 0) {
    if (
      items[step - 1].product.productCode === "TPD" ||
      items[step - 1].product.productCode == "TPD32"
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
          handleDateChange={(date: Dayjs | null) => handleDateChange(date)}
          // handleChangeFile={handleChangeFile}
        />
      );
    }
    if (
      items[step - 1].product.productCode === "FSM" ||
      items[step - 1].product.productCode == "FSMG" ||
      items[step - 1].product.productCode == "FSRG"
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
          handleDateChange={(date: Dayjs | null) => handleDateChange(date)}
        />
      );
    }
  }
  if (step === stepsLength - 1) {
    return <StepReview input={input} data={input} />;
  }
};

export default StepContent;
