import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "dayjs/locale/pl";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StepDocumentForm({ input, handleInputChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Informacje podstawowe
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={4}>
            <DatePicker
              name="dateInsert"
              label="Data zamówienia"
              value={input.dateInsert}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
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

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="paymentMethodLabel">Sposób płatności</InputLabel>
              <Select
                native
                labelId="paymentMethodLabel"
                label="Sposób płatności"
                id="paymentMethod"
                name="paymentMethod"
                value={input.paymentMethod}
                type="text"
                onChange={handleInputChange}
                // className={classes.selectEmpty}
              >
                <option />
                <option value="Termin">Termin</option>
                <option value="Pobranie">Pobranie</option>
                <option value="Gotówka">Gotówka</option>
                <option value="Proforma">Proforma</option>
                <option value="Proforma zapłacona">Proforma zapłacona</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="transportLabel">Transport</InputLabel>
              <Select
                native
                labelId="transportLabel"
                label="Transport"
                id="transport"
                name="transport"
                value={input.transport}
                type="text"
                onChange={handleInputChange}
                // className={classes.selectEmpty}
              >
                <option />
                <option value="Goodmark">Goodmark</option>
                <option value="Odbiór własny">Odbiór własny</option>
                <option value="Paczka">Paczka</option>
                <option value="Półpaleta">Półpaleta</option>
                <option value="Paleta euro">Paleta euro</option>
                <option value="Paleta max">Paleta max</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
