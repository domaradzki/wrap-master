import React, { ChangeEvent, Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import { z } from "zod";
import { OrderSchema } from "@/schemas/document";

interface StepEditTapeFormProps {
  order: z.infer<typeof OrderSchema>;
  handleOrderChange: (
    event:
      | ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number | string>
  ) => void;
  handleProductChange: (
    event:
      | ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number | string>
  ) => void;
  handleTapeChange: (
    event:
      | ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string | number | null>
  ) => void;
  handleChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRealisationDateChange: (value: Dayjs) => void;
  handleAcceptationnDateChange: (value: Dayjs) => void;
}

export default function StepEditTapeForm({
  order,
  handleOrderChange,
  handleProductChange,
  handleTapeChange,
  handleRealisationDateChange,
  handleAcceptationnDateChange,
  handleChangeFile,
}: StepEditTapeFormProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "10px" }}>
          Parametry taśmy z nadrukiem
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
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="printName"
              name="printName"
              label="Nazwa nadruku"
              onChange={handleTapeChange}
              value={order.product.tape?.printName}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              name="dateOfAcceptation"
              label="Data akceptacji"
              value={dayjs(order.product.tape?.dateOfAcceptation)}
              onChange={(newValue) =>
                handleAcceptationnDateChange(newValue as Dayjs)
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth required sx={{ minWidth: 94 }}>
              <InputLabel id="rollerLabel">Wałek</InputLabel>
              <Select
                labelId="rollerLabel"
                label="Wałek"
                id="roller"
                name="roller"
                value={order.product.tape?.roller}
                type="number"
                onChange={handleTapeChange}
              >
                <MenuItem value={144}>144</MenuItem>
                <MenuItem value={180}>180</MenuItem>
                <MenuItem value={244}>244</MenuItem>
                <MenuItem value={306}>306</MenuItem>
                <MenuItem value={438}>438</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="tapeLong"
              name="tapeLong"
              label="Długość"
              onChange={handleTapeChange}
              value={order.product.tape?.tapeLong}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mm</InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="tapeWidth"
              name="tapeWidth"
              label="Szerokość"
              onChange={handleTapeChange}
              value={order.product.tape?.tapeWidth}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mm</InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="tapeThickness"
              name="tapeThickness"
              label="Grubość"
              onChange={handleTapeChange}
              value={order.product.tape?.tapeThickness}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">my</InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="tapeColor"
              name="tapeColor"
              label="Kolor taśmy"
              onChange={handleTapeChange}
              value={order.product.tape?.tapeColor}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="glue"
              name="glue"
              label="Klej"
              onChange={handleTapeChange}
              value={order.product.tape?.glue}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="numberOfColors"
              name="numberOfColors"
              label="Ilość kolorów"
              onChange={handleTapeChange}
              value={order.product.tape?.numberOfColors}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="color1"
              name="color1"
              label="Kolor 1"
              onChange={handleTapeChange}
              value={order.product.tape?.color1}
              type="text"
              fullWidth
            />
          </Grid>
          {+(order.product.tape?.numberOfColors ?? 0) >= 2 && (
            <Grid item xs={12} md={2}>
              <TextField
                id="color2"
                name="color2"
                label="Kolor 2"
                onChange={handleTapeChange}
                value={order.product.tape?.color2}
                type="text"
                fullWidth
              />
            </Grid>
          )}
          {+(order.product.tape?.numberOfColors ?? 0) === 3 && (
            <Grid item xs={12} md={2}>
              <TextField
                id="color3"
                name="color3"
                label="Kolor 3"
                onChange={handleTapeChange}
                value={order.product.tape?.color3}
                type="text"
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12} md={3}>
            <input
              accept="image/*"
              id="fileX"
              name="imageFile"
              multiple
              type="file"
              hidden
              onChange={handleChangeFile}
            />
            <label htmlFor="fileX">
              <Button
                variant="contained"
                color="primary"
                component="div"
                sx={{ height: "53px" }}
              >
                Wgraj plik
              </Button>
            </label>
          </Grid>
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
