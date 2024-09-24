import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Box, TextField } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Tape } from "./step-content";
import "dayjs/locale/pl";

export default function ReviewTape({ item }: { item: Tape }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "20px 0" }}>
          Parametry taśmy z nadrukiem
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", margin: "10px 0" }}>
          <Grid item xs={12} sm={9}>
            <TextField
              id="outlined-read-only-input"
              label="Data realizacji"
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
              label="Wartość"
              defaultValue={`${item.netValue.toFixed(2)}${
                item.currency === "PLN" ? "zł" : item.currency
              }`}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={2}>
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
          <Grid item xs={12} sm={1}>
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
          <Grid item xs={12} sm={1}>
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
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
