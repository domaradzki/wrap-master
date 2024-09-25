import { Document } from "@/utils/structure";
import { Typography, Paper, SelectChangeEvent } from "@mui/material";
import { Fragment, useState } from "react";
import StepSuccess from "./step-success";
import CheckoutStepper from "./stepper";
import StepButtons from "./step-buttons";
import { useRouter } from "next/navigation";
import StepContent from "./step-content";
import dayjs from "dayjs";
import "dayjs/locale/pl";

interface CheckoutProps {
  document: Document;
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

const Checkout = ({ document, onSubmit, onClose }: CheckoutProps) => {
  console.log("Check", document);
  const router = useRouter();
  const { orders } = document;

  const orderItems = orders.map((order) => {
    return {
      ...order.product,
      orderId: order.orderId,
      dateOfRealisation: dayjs(order.dateOfRealisation).locale("pl"),
      price: order.price,
      quantity: order.quantity,
      netValue: order.netValue,
      margin: "",
      roller: "",
    };
  });

  const documentValues = {
    documentId: document.documentId,
    name: document.company.name,
    deliveryAddress: document.company.deliveryAddress,
    dateInsert: dayjs(document.dateInsert).locale("pl"),
    details: document.details,
    documentStatus: document.documentStatus,
    exchangeRate: document.exchangeRate,
    currency: document.currency,
    signature: document.signature,
    symbol: document.symbol,
    timestamp: document.timestamp,
    trader: document.trader,
    transport: "",
    paymentMethod: "",
  };

  const [activeStep, setActiveStep] = useState(0);
  const [input, setInput] = useState(documentValues);
  const [items, setItems] = useState<any[]>(orderItems);

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
    setItems([...data]);
  };

  const handleDateChange = (date: dayjs.Dayjs | null, name: string) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    (currentOrder as any)[name] = date;
    setItems([...data]);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    const { files } = event.target;
    if (files) {
      (currentOrder as any).file = files[0];
    }
    setItems([...data]);
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
    const editedDocument = { ...input, orders: [...items] };
    console.log("FULLORDER", editedDocument);
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
                handleChangeFile={handleChangeFile}
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
