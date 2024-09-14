import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
// import DateFnsUtils from "@date-io/date-fns";
// import plLocale from "date-fns/locale/pl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StepDocumentForm({
  input,
  handleInputChange,
  //   handleInputChange,
}) {
  //   const [value, setValue] = useState<Dayjs | null>(dayjs(input.dateInsert));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Informacje podstawowe
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            {/* <KeyboardDatePicker
              required
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateInsert"
              name="dateInsert"
              helperText="Data zamówienia"
              value={input.dateInsert}
              type="text"
              onChange={handleInputChange("dateInsert")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            /> */}
            <DatePicker
              id="dateInsert"
              name="dateInsert"
              label="Data zamówienia"
              value={input.dateInsert}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <KeyboardDatePicker
              required
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateOfRealisation"
              name="dateOfRealisation"
              helperText="Data realizacji"
              value={input.dateOfRealisation}
              type="text"
              onChange={handleInputChange("dateOfRealisation")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            /> */}
            {/* <DatePicker
              id="dateOfRealisation"
              name="dateOfRealisation"
              helperText="Data realizacji"
              value={input.dateOfRealisation}
              onChange={(newValue) => setValue(newValue)}
            /> */}
          </Grid>
          <Grid item xs={12} sm={8}>
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
            {/* <KeyboardDatePicker
              fullWidth
              format="dd/MM/yyyy"
              margin="normal"
              id="dateOfPay"
              name="dateOfPay"
              value={input.dateOfPay}
              type="text"
              onChange={handleInputChange("dateOfPay")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            /> */}
            {/* <DatePicker
              id="dateOfPay"
              name="dateOfPay"
              helperText="Data płatności"
              label="Controlled picker"
              value={input.dateOfPay}
              onChange={(newValue) => setValue(newValue)}
            /> */}
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              id="quantity"
              name="quantity"
              label="Ilość"
              onChange={handleInputChange}
              value={input.quantity}
              type="number"
              fullWidth
              autoComplete="quantity"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{input.unit}</InputAdornment>
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
              onChange={handleInputChange}
              value={input.price}
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
              onChange={handleInputChange}
              value={input.netValue}
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
              <InputLabel id="paymentMethodLabel">Sposób płatności</InputLabel>
              <Select
                native
                labelId="paymentMethodLabel"
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
              <InputLabel id="marginLabel">Marża</InputLabel>
              <Select
                native
                labelId="marginLabel"
                id="margin"
                name="margin"
                value={input.margin}
                type="number"
                onChange={handleInputChange}
                // className={classes.selectEmpty}
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
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="transportLabel">Transport</InputLabel>
              <Select
                native
                labelId="transportLabel"
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
          <Grid item xs={12} sm={4}>
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
