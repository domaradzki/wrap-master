import { Document } from "@/utils/structure";
import { Typography, Paper } from "@mui/material";
import { Fragment, useState } from "react";
import StepSuccess from "./step-success";
import CheckoutStepper from "./stepper";
import StepButtons from "./step-buttons";
import { useRouter } from "next/navigation";
import StepContent from "./step-content";
import dayjs from "dayjs";

interface CheckoutProps {
  order: Document;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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

const Checkout = ({ order, onSubmit, onClose }: CheckoutProps) => {
  const router = useRouter();
  const { orders } = order;

  const productValues = orders.map((order) => {
    return {
      ...order,
      ...order.product,
    };
  });

  const documentValues = {
    ...order,
    dateInsert: dayjs(order.dateInsert),
    name: order.company.name,
    deliveryAddress: order.company.deliveryAddress,
    transport: "",
    paymentMethod: "",
  };

  const [activeStep, setActiveStep] = useState(0);
  const [input, setInput] = useState(documentValues);
  const [items, steItems] = useState<Document["orders"]>(productValues);

  const stepsArray = order.orders.map((order) => ({
    stepName: order.product?.productCode,
    id: order.product.productId,
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleDocumentDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    (currentOrder as any)[event.target.name] = event.target.value;
    console.log("CHANGE", { [event.target.name]: event.target.value });

    steItems([...data]);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    (currentOrder as any)[event.target.name] = event.target.value;
    steItems([...data]);
  };

  const handleNext = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };

  const handleAddOrder = (event) => {
    event.preventDefault();
    console.log(event);
  };

  console.log("items", items);

  return (
    <Fragment>
      <Paper sx={{ marginBottom: 6, padding: 3 }}>
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
              <StepContent
                step={activeStep}
                stepsLength={steps.length}
                order={order}
                input={input}
                items={items}
                handleInputChange={handleInputChange}
                handleProductChange={handleProductChange}
                handleDateChange={handleDateChange}
                handleDocumentDateChange={handleDocumentDateChange}
                // handleChangeFile={handleChangeFile}
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

export default Checkout;
