import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import "dayjs/locale/pl";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FieldChangeHandler } from "@mui/x-date-pickers/internals";

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
  printName?: string;
  dateOfAcceptation?: string;
  tapeLong?: number;
  tapeWidth?: number;
  tapeThickness?: number;
  tapeColor?: string;
  roller?: number;
  glue?: string;
  numberOfColors?: number;
  color1?: string;
  color2?: string;
  color3?: string;
}

interface StepProductFormProps {
  item: Item;
  handleProductChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number>
  ) => void;
  handleDateChange: FieldChangeHandler<Dayjs | null, DateValidationError>;
  // handleChangeFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StepProductForm({
  item,
  handleProductChange,
  handleDateChange,
}: // handleChangeFile,
StepProductFormProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Parametry towaru do wysyłki
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="quantity"
              name="quantity"
              label="Ilość"
              onChange={handleProductChange}
              value={item.quantity}
              type="number"
              fullWidth
              autoComplete="quantity"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{item.unit}</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="price"
              name="price"
              label="Cena"
              onChange={handleProductChange}
              value={item.price}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="price"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="netValue"
              name="netValue"
              label="Wartość"
              onChange={handleProductChange}
              value={item.netValue}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="net value"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="marginLabel">Marża</InputLabel>
              <Select
                native
                labelId="marginLabel"
                label="Marża"
                id="margin"
                name="margin"
                value={item.margin}
                type="number"
                onChange={handleProductChange}
              >
                <option />

                <option value={0}>0</option>
                <option value={0.25}>0.25</option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
