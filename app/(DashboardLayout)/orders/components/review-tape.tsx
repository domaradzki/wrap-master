import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pl";

import { Tape } from "./step-content";

export default function ReviewTape({ item }: { item: Tape }) {
  let zloty = Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ margin: "10px 0 0" }}>
          Parametry taśmy z nadrukiem
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
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-read-only-input"
              label="Nadruk"
              defaultValue={item.printName}
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
              label="Data akceptacji projektu"
              defaultValue={dayjs(item.dateOfAcceptation)
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
              label="Wałek"
              defaultValue={`${item.roller}mm`}
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
              label="Długość"
              defaultValue={`${item.tapeLong}mm`}
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
              label="Szerokość"
              defaultValue={`${item.tapeWidth}mm`}
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
              defaultValue={`${item.tapeThickness}my`}
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
              label="Kolor taśmy"
              defaultValue={item.tapeColor}
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
              label="Klej"
              defaultValue={item.glue}
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
              label="Kolory"
              defaultValue={item.numberOfColors}
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
              label="Kolor 1"
              defaultValue={item.color1}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {item.numberOfColors && +item.numberOfColors >= 2 && (
            <Grid item xs={12} sm={2}>
              <TextField
                id="outlined-read-only-input"
                label="Kolor 2"
                defaultValue={item.color2}
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}
          {item.numberOfColors && +item.numberOfColors === 3 && (
            <Grid item xs={12} sm={2}>
              <TextField
                id="outlined-read-only-input"
                label="Kolor 3"
                defaultValue={item.color3}
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )}
          <Grid item xs={12} md={3}>
            {item.file && (
              <img
                src={item.file ? URL.createObjectURL(item.file) : undefined}
                width="100%"
                alt={item.file ? "Projekt" : ""}
              />
            )}
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
