import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pl";

import { Item } from "./step-content";

export default function ReviewProduct({ item }: { item: Item }) {
  let zloty = Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ margin: "10px 0 0" }}>
          Szczegóły produktu
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", margin: "10px 0" }}>
          <Grid item xs={12} sm={9}>
            <TextField
              id="outlined-read-only-input"
              label="Nazwa produktu"
              defaultValue={item.assortment}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="outlined-read-only-input"
              label="Data realizacji"
              defaultValue={dayjs(item.dateOfRealisation)
                .format("DD/MM/YYYY")
                .toString()}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="outlined-read-only-input"
              label="Cena"
              defaultValue={`${zloty.format(item.price)}`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="outlined-read-only-input"
              label="Ilość"
              defaultValue={`${item.quantity} ${item.unit}`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="outlined-read-only-input"
              label="Wartość"
              defaultValue={`${zloty.format(item.netValue)}`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="outlined-read-only-input"
              label="Marża"
              defaultValue={`${item.margin}%`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
