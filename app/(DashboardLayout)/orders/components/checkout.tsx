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
import StepButtons from "./step-buttons";
import { useRouter } from "next/navigation";
import StepContent from "./step-content";
import dayjs, { Dayjs } from "dayjs";

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
  const [activeStep, setActiveStep] = useState(0);

  const stepsArray = order.orders.map((order) => order.product?.productCode);

  let steps = stepsArray.map((item) => stepsLegend[item]);
  steps = ["Informacje ogólne", ...steps, "Weryfikacja"];

  const initialValues = {
    ...order,
    dateInsert: dayjs(order.dateInsert),
    name: order.company.name,
    deliveryAddress: order.company.deliveryAddress,
    // quantity: order.quantity,
    // unit: order.unit,
    // price: order.price,
    // netValue: order.netValue,
    // details: `${order.details} ${order.postfix ? order.postfix : ""}`,
    // transport: "",
    // margin: "",
    // paymentMethod: "",
    // dateInsert: dayjs(order.dateInsert),
    // dateOfRealisation: order.dateOfRealisation,
    // dateOfPay: null,
    // sleeve: order.sleeve,
    // stretchColor: order.stretchColor,
    // stretchThickness: order.stretchThickness,
    // netWeight: order.netWeight,
    // grossWeight: order.grossWeight,
    // tapeLong: order.tapeLong,
    // tapeWidth: order.tapeWidth,
    // tapeThickness: order.tapeThickness,
    // tapeColor: order.tapeColor,
    // numberOfColors: order.numberOfColors,
    // glue: order.glue,
    // printName: "",
    // roller: "",
    // dateOfAcceptation: null,
    // color1: "",
    // color2: "",
    // color3: "",
    // file: null,
  };

  const [input, setInput] = useState(initialValues);
  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const [items, steItems] = useState(order.orders);

  const handleProductChange = (event) => {
    steItems([
      ...items,
       items[activeStep].[event.target.name]= event.target.value,
  });
    console.log(event.target.value);
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

  return (
    <Fragment>
      <Paper sx={{ marginBottom: 6, padding: 3 }}>
        <Typography component="h1" variant="h4" align="center">
          Kontrola zamówienia
        </Typography>
        <CheckoutStepper steps={steps} activeStep={activeStep} />
        <Fragment>
          {activeStep === steps.length - 1 ? (
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
