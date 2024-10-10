import { Typography, Paper, SelectChangeEvent } from "@mui/material";
import { Fragment, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import CheckoutStepper from "../stepper";
import StepContent from "./step-content";
import StepSuccess from "../step-success";
import StepButtons from "../step-buttons";

import { Document } from "@/utils/structure";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import { addDocumentWithItems } from "@/actions/add-document-with-items";
import { z } from "zod";
import { File } from "buffer";

interface DocumentCheckoutProps {
  document: Document;
  // onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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

const DocumentCheckout = ({ document, onClose }: DocumentCheckoutProps) => {
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
    companyId: document.company.companyId,
    closed: document.closed,
    deliveryAddress: document.company.deliveryAddress,
    dateInsert: document.dateInsert,
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

  const apiCall = async () => {
    const formData = new FormData();

    // Append order data to formData
    const data = { ...input, orders: [...items] };

    // Convert orders to JSON and append to FormData
    formData.append("data", JSON.stringify(data));

    // Append each file in items to FormData
    if (items[0].file) {
      formData.append(`file`, items[0].file);
    }
    fetch("/api/image", {
      method: "POST",
      body: formData,
    });
  };

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

  const handleRealisationDateChange = (value: Dayjs) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    (currentOrder as any).dateOfRealisation = value.toString();
    setItems([...data]);
  };

  const handleAcceptationnDateChange = (value: Dayjs) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    (currentOrder as any).dateOfAcceptation = value.toString();
    setItems([...data]);
  };

  const handleInsertDateChange = (value: Dayjs) => {
    setInput({
      ...input,
      dateInsert: value.toString(),
    });
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...items];
    const currentOrder = data[activeStep - 1];
    const { files } = event.target;

    if (files) {
      (currentOrder as any).file = files[0].name;
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

  const handleAddOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = JSON.parse(JSON.stringify({ ...input, orders: [...items] }));
    startTransition(() => {
      // apiCall();
      addDocumentWithItems(data)
        .then((data) => {
          if (data.error) {
            console.log("Error:", data.error);
            setError(data.error);
            toast.error("Coś poszło nie tak!");
          }
          if (data.success) {
            console.log("Success:", data.success);

            update();
            setSuccess(data.success);
            toast.success("Dodano zamówienie!");
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
          setError("Coś poszło nie tak!");
          toast.error("Coś poszło nie tak!");
        });
    });
    // apiCall(data.orders[0].file);
    console.log("document-!!!", { ...input, orders: [...items] });
    onClose();
    router.back();
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
              <StepContent
                step={activeStep}
                stepsLength={steps.length}
                input={input}
                items={items}
                handleInputChange={handleInputChange}
                handleProductChange={handleProductChange}
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

export default DocumentCheckout;
