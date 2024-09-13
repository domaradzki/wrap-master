import { Document } from "@/utils/structure";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { Fragment, useState } from "react";
import StepSuccess from "./step-success";
import CheckoutStepper from "./stepper";

interface CheckoutProps {
  order: Document;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}
const stepsProduct = ["Informacje ogólne", "Parametry produktu", "Weryfikacja"];
const stepsTransportOnly = ["Informacje ogólne", "Weryfikacja"];

const Checkout = ({ order, onSubmit, onClose }: CheckoutProps) => {
  const [assortment, setAssortment] = useState(order?.signature || "");
  const [name, setName] = useState(order?.company.name || "");
  const [trader, setTrader] = useState(order?.trader || "");
  const [details, setDetails] = useState(order?.details || "");
  const [closed, setClosed] = useState(order?.closed || false);
  const [companyId, setCompanyId] = useState(order?.company.companyId || 0);
  const [currency, setCurrency] = useState(order?.currency || "");
  const [dateInsert, setDateInsert] = useState(order?.dateInsert || "");
  const [deliveryAddress, setDeliveryAddress] = useState(
    order?.company.deliveryAddress || ""
  );
  const [documentId, setDocumentId] = useState(order?.documentId || 0);
  const [documentStatus, setDocumentStatus] = useState(
    order?.documentStatus || 0
  );
  const [exchangeRate, setExchangeRate] = useState(order?.exchangeRate || null);
  const [signature, setSignature] = useState(order?.signature || "");
  const [symbol, setSymbol] = useState(order?.symbol || "");
  const [timestamp, setTimestamp] = useState(order?.timestamp || 0);

  const [activeStep, setActiveStep] = useState(0);

  const steps = 2 + order?.orders?.length;

  const handleNext = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActiveStep(activeStep + 1);
  };

  const handleBack = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };

  const handleChangeAssortment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssortment(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeTrader = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrader(event.target.value);
  };

  const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
  };

  const handleChangeClosed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClosed(event.target.checked);
  };

  const handleChangeCompanyId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyId(Number(event.target.value));
  };

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleChangeDateInsert = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateInsert(event.target.value);
  };

  const handleChangeDeliveryAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryAddress(event.target.value);
  };

  const handleChangeDocumentId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumentId(Number(event.target.value));
  };

  const handleChangeDocumentStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumentStatus(Number(event.target.value));
  };

  const handleChangeExchangeRate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExchangeRate(Number(event.target.value));
  };

  const handleChangeSignature = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignature(event.target.value);
  };

  const handleChangeSymbol = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  const handleChangeTimestamp = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimestamp(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedOrder = {
      ...order,
      name,
      trader,
      details,
      closed,
      companyId,
      currency,
      dateInsert,
      deliveryAddress,
      documentId,
      documentStatus,
      exchangeRate,
      signature,
      symbol,
      timestamp,
    };
    onSubmit(event);
  };

  return (
    <Fragment>
      <Paper sx={{ marginBottom: 6, padding: 3 }}>
        <Typography component="h1" variant="h4" align="center">
          Kontrola zamówienia
        </Typography>
        <CheckoutStepper steps={steps} activeStep={activeStep} />
        <Fragment>
          {activeStep === steps ? (
            <StepSuccess />
          ) : (
            <form
              onSubmit={handleNext}
              encType="multipart/form-data"
              method="POST"
            >
              {/* <GetStepContent
                step={activeStep}
                stepsLength={steps.length}
                input={input}
                activeOrder={activeOrder}
                type={activeOrder.type}
                kind={activeOrder.kind}
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
                handleChangeFile={handleChangeFile}
              />
              <FormButtons
                steps={steps}
                activeStep={activeStep}
                handleBack={handleBack}
                handleAddOrder={handleAddOrder}
                history={props.history}
              /> */}
            </form>
          )}
        </Fragment>
      </Paper>
    </Fragment>
  );
};

export default Checkout;
