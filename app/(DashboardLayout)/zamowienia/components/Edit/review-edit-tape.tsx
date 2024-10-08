import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { OrderSchema } from "@/schemas/document";
import { z } from "zod";

export default function ReviewTape({
  order,
}: {
  order: z.infer<typeof OrderSchema>;
}) {
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
              defaultValue={order.product.assortment}
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
              defaultValue={dayjs(order.dateOfRealisation)
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
              defaultValue={`${zloty.format(order.price)}`}
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
              defaultValue={`${order.quantity} ${order.product.unit}`}
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
              defaultValue={`${zloty.format(order.netValue)}`}
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
              defaultValue={`${order.margin}%`}
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
              defaultValue={order.product.tape?.printName}
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
              defaultValue={dayjs(order.product.tape?.dateOfAcceptation)
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
              defaultValue={`${order.product.tape?.roller}mm`}
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
              defaultValue={`${order.product.tape?.tapeLong}mm`}
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
              defaultValue={`${order.product.tape?.tapeWidth}mm`}
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
              defaultValue={`${order.product.tape?.tapeThickness}my`}
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
              defaultValue={order.product.tape?.tapeColor}
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
              defaultValue={order.product.tape?.glue}
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
              defaultValue={order.product.tape?.numberOfColors}
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
              defaultValue={order.product.tape?.color1}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {order.product.tape?.numberOfColors &&
            +order.product.tape?.numberOfColors >= 2 && (
              <Grid item xs={12} sm={2}>
                <TextField
                  id="outlined-read-only-input"
                  label="Kolor 2"
                  defaultValue={order.product.tape?.color2}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
          {order.product.tape?.numberOfColors &&
            +order.product.tape?.numberOfColors === 3 && (
              <Grid item xs={12} sm={2}>
                <TextField
                  id="outlined-read-only-input"
                  label="Kolor 3"
                  defaultValue={order.product.tape?.color3}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
          <Grid item xs={12} md={3}>
            {order.product.tape?.file && (
              <img
                src={
                  order.product.tape?.file
                    ? URL.createObjectURL(order.product.tape?.file)
                    : undefined
                }
                width="100%"
                alt={order.product.tape?.file ? "Projekt" : ""}
              />
            )}
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
