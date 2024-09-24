import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import "dayjs/locale/pl";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FieldChangeHandler } from "@mui/x-date-pickers/internals";
import { MenuItem } from "@mui/material";

interface Item {
  assortment: string;
  price: number;
  unit: string;
  kind: string;
  type: string;
  productCode: string;
  netValue?: number;
  margin?: number;
  dateOfRealisation?: string;
  product: {
    productCode: string;
  };
  quantity: number;
  printName?: string;
  dateOfAcceptation?: string;
  tapeLong?: number;
  tapeWidth?: number;
  tapeThickness?: number;
  tapeColor?: string;
  roller?: number;
  glue?: string;
  numberOfColors?: number;
  color1?: string;
  color2?: string;
  color3?: string;
}

interface StepTapeFormProps {
  item: Item;
  handleProductChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number>
  ) => void;
  handleDateChange: FieldChangeHandler<Dayjs | null, DateValidationError>;
  // handleChangeFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StepTapeForm({
  item,
  handleProductChange,
  handleDateChange,
}: // handleChangeFile,
StepTapeFormProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "30px" }}>
          Parametry taśmy z nadrukiem
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="printName"
              name="printName"
              label="Nazwa nadruku"
              onChange={handleProductChange}
              value={item.printName}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              name="dateOfAcceptation"
              label="Data akceptacji"
              value={dayjs(item.dateOfAcceptation)}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="tapeLong"
              name="tapeLong"
              label="Długość"
              onChange={handleProductChange}
              value={item.tapeLong}
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
              onChange={handleProductChange}
              value={item.tapeWidth}
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
              onChange={handleProductChange}
              value={item.tapeThickness}
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
              onChange={handleProductChange}
              value={item.tapeColor}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth required sx={{ minWidth: 94 }}>
              <InputLabel id="rollerLabel">Wałek</InputLabel>
              <Select
                labelId="rollerLabel"
                label="Wałek"
                id="roller"
                name="roller"
                value={item.roller}
                type="number"
                onChange={handleProductChange}
              >
                {/* <MenuItem disabled value="">
                  <em>Wybierz</em>
                </MenuItem> */}
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
              id="glue"
              name="glue"
              label="Klej"
              onChange={handleProductChange}
              value={item.glue}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              id="numberOfColors"
              name="numberOfColors"
              label="Ilość kolorów"
              onChange={handleProductChange}
              value={item.numberOfColors}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              required
              id="color1"
              name="color1"
              label="Kolor 1"
              onChange={handleProductChange}
              value={item.color1}
              type="text"
              fullWidth
            />
          </Grid>
          {+(item.numberOfColors ?? 0) >= 2 && (
            <Grid item xs={12} md={3}>
              <TextField
                id="color2"
                name="color2"
                label="Kolor 2"
                onChange={handleProductChange}
                value={item.color2}
                type="text"
                fullWidth
              />
            </Grid>
          )}
          {+(item.numberOfColors ?? 0) === 3 && (
            <Grid item xs={12} md={3}>
              <TextField
                id="color3"
                name="color3"
                label="Kolor 3"
                onChange={handleProductChange}
                value={item.color3}
                type="text"
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <input
              accept="image/*"
              // className={classes.input}
              id="fileX"
              name="imageFile"
              multiple
              type="file"
              hidden
              // onChange={handleChangeFile}
            />
            <label htmlFor="fileX">
              <Button variant="contained" color="primary" component="span">
                Wgraj plik
              </Button>
            </label>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <img
              src={input.file ? URL.createObjectURL(input.file) : null}
              width="100%"
              alt={input.file ? "Projekt" : ""}
            />
          </Grid> */}
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
