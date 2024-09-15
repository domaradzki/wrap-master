import React from "react";
import StepStretchForm from "./step-stretch-form";
// import Review from "../../components/Review/Review";
import StepDocumentForm from "./step-document-form";
import StepTapeForm from "./step-tape-form";

const StepContent = ({
  step,
  stepsLength,
  input,
  order,
  items,
  handleInputChange,
  handleProductChange,
  // handleChangeFile,
}) => {
  if (step === 0) {
    console.log("input", input);
    console.log("items", items);

    return (
      <StepDocumentForm input={input} handleInputChange={handleInputChange} />
    );
  } else if (step > 0) {
    if (
      items[step - 1].product.productCode === "TPD" ||
      items[step - 1].product.productCode == "TPD32"
    ) {
      return (
        <StepTapeForm
          item={items[step - 1]}
          handleProductChange={handleProductChange}
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
          index={step - 1}
          item={items[step - 1]}
          handleProductChange={handleProductChange}
        />
      );
    }
  }
  //   if (step === stepsLength - 1) {
  //     return <Review input={input} data={order} />;
  //   }
};

export default StepContent;
