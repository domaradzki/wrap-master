import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Box, TextField } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import { Stretch } from "./step-content";

export default function ReviewStretch({ item }: { item: Stretch }) {
  // format number to Euro
  let zloty = Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  console.log("CURENCY", typeof zloty.format(item.netValue));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "20px 0" }}>
          Parametry folii stretch
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", margin: "10px 0" }}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={2}>
            <TextField
              id="outlined-read-only-input"
              label="Cena"
              defaultValue={`${item.price.toFixed(2)}${
                item.currency === "PLN" ? "zł" : item.currency
              }`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="outlined-read-only-input"
              label="Ilość"
              defaultValue={`${item.quantity}${item.unit}`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="outlined-read-only-input"
              label="Wartość"
              defaultValue={`${zloty.format(item.netValue)}`}
              // defaultValue={`${item.netValue.toFixed(2)}${
              //   item.currency === "PLN" ? "zł" : item.currency
              // }`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
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
          <Grid item xs={12} sm={2}>
            <TextField
              id="outlined-read-only-input"
              label="Grubość"
              defaultValue={`${item.stretchThickness}my`}
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
              label="Kolor"
              defaultValue={item.stretchColor}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="outlined-read-only-input"
              label="Waga netto"
              defaultValue={`${item.netWeight}kg`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              id="outlined-read-only-input"
              label="Tuleja"
              defaultValue={`${item.sleeve}g`}
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
              label="Waga brutto"
              defaultValue={`${item.grossWeight}kg`}
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
