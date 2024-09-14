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
  type,
  kind,
  handleInputChange,
  handleDateChange,
  handleChangeFile,
}) => {
  if (step === 0) {
    return (
      <StepDocumentForm
        input={input}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
      />
    );
  } else if (step === 1) {
    if (kind === "KT" && type === "TPD") {
      return (
        <StepTapeForm
          input={input}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleChangeFile={handleChangeFile}
        />
      );
    }
    if (kind === "KT" && type === "FS") {
      return (
        <StepStretchForm input={input} handleInputChange={handleInputChange} />
      );
    }
  }
  //   if (step === stepsLength - 1) {
  //     return <Review input={input} data={order} />;
  //   }
};

export default StepContent;
