import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import "dayjs/locale/pl";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function StepTapeForm({
  item,
  handleProductChange,
  // handleChangeFile,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Parametry taśmy z nadrukiem
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="printName"
              name="printName"
              label="Nadruk"
              onChange={handleProductChange}
              value={item.printName}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateField
              id="dateOfAcceptation"
              name="dateOfAcceptation"
              helperText="Data akceptacji"
              value={item.dateOfAcceptation}
              onChange={handleProductChange}
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
            <FormControl fullWidth required sx={{ minWidth: 120 }}>
              <InputLabel id="rollerLabel">Wałek</InputLabel>
              <Select
                native
                labelId="rollerLabel"
                id="roller"
                name="roller"
                value={item.roller}
                type="number"
                onChange={handleProductChange}
                // className={classes.selectEmpty}
              >
                <option />
                <option value={144}>144</option>
                <option value={180}>180</option>
                <option value={244}>244</option>
                <option value={306}>306</option>
                <option value={438}>438</option>
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
          {+item.numberOfColors >= 2 && (
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
          {+item.numberOfColors === 3 && (
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
