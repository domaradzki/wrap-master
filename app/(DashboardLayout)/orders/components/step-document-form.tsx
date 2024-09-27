import React, { ChangeEvent, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import { MenuItem } from "@mui/material";

interface InputProps {
  name: string;
  deliveryAddress: string;
  dateInsert: Date;
  details: string;
  paymentMethod: string;
  transport: string;
}

interface StepDocumentFormProps {
  input: InputProps;
  handleInputChange: (
    event:
      | ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => void;
  handleInsertDateChange: (value: Dayjs) => void;
}

export default function StepDocumentForm({
  input,
  handleInputChange,
  handleInsertDateChange,
}: StepDocumentFormProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "30px" }}>
          Informacje podstawowe
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <TextField
              required
              id="name"
              name="name"
              label="Klient"
              onChange={handleInputChange}
              value={input.name}
              type="text"
              fullWidth
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              name="dateInsert"
              label="Data zamówienia"
              value={dayjs(input.dateInsert)}
              onChange={(newValue) => handleInsertDateChange(newValue as Dayjs)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="deliveryAddress"
              name="deliveryAddress"
              label="Adres dostawy"
              onChange={handleInputChange}
              value={input.deliveryAddress}
              type="text"
              fullWidth
              autoComplete="delivery address"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="paymentMethodLabel">Płatność</InputLabel>
              <Select
                labelId="paymentMethodLabel"
                label="Sposób płatności"
                id="paymentMethod"
                name="paymentMethod"
                value={input.paymentMethod}
                type="text"
                onChange={handleInputChange}
              >
                <MenuItem value="Termin">Termin</MenuItem>
                <MenuItem value="Pobranie">Pobranie</MenuItem>
                <MenuItem value="Gotówka">Gotówka</MenuItem>
                <MenuItem value="Proforma">Proforma</MenuItem>
                <MenuItem value="Proforma zapłacona">
                  Proforma zapłacona
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="transportLabel">Transport</InputLabel>
              <Select
                labelId="transportLabel"
                label="Transport"
                id="transport"
                name="transport"
                value={input.transport}
                type="text"
                onChange={handleInputChange}
                // className={classes.selectEmpty}
              >
                <MenuItem />
                <MenuItem value="Goodmark">Goodmark</MenuItem>
                <MenuItem value="Odbiór własny">Odbiór własny</MenuItem>
                <MenuItem value="Paczka">Paczka</MenuItem>
                <MenuItem value="Półpaleta">Półpaleta</MenuItem>
                <MenuItem value="Paleta euro">Paleta euro</MenuItem>
                <MenuItem value="Paleta max">Paleta max</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="details"
              name="details"
              label="Uwagi"
              onChange={handleInputChange}
              value={input.details}
              type="text"
              fullWidth
              autoComplete="details"
            />
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
