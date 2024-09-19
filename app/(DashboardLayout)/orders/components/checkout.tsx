import { Document } from "@/utils/structure";
import { Typography, Paper, SelectChangeEvent } from "@mui/material";
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

  const productValues = orders.map((item) => {
    return {
      ...item,
      ...item.product,
      currency: order.currency,
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
  const [items, steItems] = useState<any[]>(productValues);

  const stepsArray = order.orders.map((order) => ({
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

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    setInput({
      ...input,
      [name!]: value,
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

  const handleProductChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | { name?: string; value: unknown };
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    (currentOrder as any)[name!] = value;
    steItems([...data]);
  };

  const handleDateChange = (date: dayjs.Dayjs | null, name: string) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    (currentOrder as any)[name] = date;
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

  const handleAddOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput({ ...input, orders: items });
    console.log("FULLORDER", input);
    onClose();
  };

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
                input={input}
                items={items}
                handleInputChange={handleInputChange}
                handleProductChange={handleProductChange}
                handleDateChange={(date) =>
                  handleDateChange(date, "dateFieldName")
                }
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
