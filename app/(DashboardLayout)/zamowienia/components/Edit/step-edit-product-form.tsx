import React, { ChangeEvent, Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import { z } from "zod";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import { OrderSchema } from "@/schemas/document";

interface StepEditProductFormProps {
  order: z.infer<typeof OrderSchema>;
  handleOrderChange: (
    event:
      | ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number>
  ) => void;
  handleProductChange: (
    event:
      | ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number>
  ) => void;
  handleRealisationDateChange: (value: Dayjs) => void;
}

export default function StepEditProductForm({
  order,
  handleOrderChange,
  handleProductChange,
  handleRealisationDateChange,
}: StepEditProductFormProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "10px" }}>
          Parametry towaru do wysyłki
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <TextField
              required
              id="assortment"
              name="assortment"
              label="Nazwa produktu"
              onChange={handleProductChange}
              value={order.product.assortment}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              name="dateOfRealisation"
              label="Data realizacji"
              value={dayjs(order.dateOfRealisation)}
              onChange={(newValue) =>
                handleRealisationDateChange(newValue as Dayjs)
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="price"
              name="price"
              label="Cena"
              onChange={handleOrderChange}
              value={order.price.toFixed(2)}
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
              id="quantity"
              name="quantity"
              label="Ilość"
              onChange={handleOrderChange}
              value={order.quantity}
              type="number"
              fullWidth
              autoComplete="quantity"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {order.product.unit}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="netValue"
              name="netValue"
              label="Wartość"
              onChange={handleOrderChange}
              value={order.netValue.toFixed(2)}
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
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="marginLabel">Marża</InputLabel>
              <Select
                labelId="marginLabel"
                label="Marża"
                id="margin"
                name="margin"
                value={order.margin}
                type="number"
                onChange={handleOrderChange}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={0.25}>0.25</MenuItem>
                <MenuItem value={0.5}>0.5</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
