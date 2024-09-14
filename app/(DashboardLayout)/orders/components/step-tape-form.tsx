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

// import DateFnsUtils from "@date-io/date-fns";
// import plLocale from "date-fns/locale/pl";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function StepTapeForm({
  input,
  handleInputChange,
  handleDateChange,
  handleChangeFile,
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
              onChange={handleInputChange}
              value={input.printName}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <KeyboardDatePicker
                fullWidth
                format="dd/MM/yyyy"
                margin="normal"
                id="dateOfAcceptation"
                name="dateOfAcceptation"
                helperText="Data akceptacji"
                value={input.dateOfAcceptation}
                type="text"
                onChange={handleDateChange("dateOfAcceptation")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              /> */}
            <DateField
              id="dateOfAcceptation"
              name="dateOfAcceptation"
              helperText="Data akceptacji"
              value={input.dateOfAcceptation}
              onChange={handleDateChange("dateOfAcceptation")}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              required
              id="tapeLong"
              name="tapeLong"
              label="Długość"
              onChange={handleInputChange}
              value={input.tapeLong}
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
              onChange={handleInputChange}
              value={input.tapeWidth}
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
              onChange={handleInputChange}
              value={input.tapeThickness}
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
              onChange={handleInputChange}
              value={input.tapeColor}
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
                value={input.roller}
                type="number"
                onChange={handleInputChange}
                className={classes.selectEmpty}
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
              onChange={handleInputChange}
              value={input.glue}
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
              onChange={handleInputChange}
              value={input.numberOfColors}
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
              onChange={handleInputChange}
              value={input.color1}
              type="text"
              fullWidth
            />
          </Grid>
          {+input.numberOfColors >= 2 && (
            <Grid item xs={12} md={3}>
              <TextField
                id="color2"
                name="color2"
                label="Kolor 2"
                onChange={handleInputChange}
                value={input.color2}
                type="text"
                fullWidth
              />
            </Grid>
          )}
          {+input.numberOfColors === 3 && (
            <Grid item xs={12} md={3}>
              <TextField
                id="color3"
                name="color3"
                label="Kolor 3"
                onChange={handleInputChange}
                value={input.color3}
                type="text"
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <input
              accept="image/*"
              className={classes.input}
              id="fileX"
              name="imageFile"
              multiple
              type="file"
              onChange={handleChangeFile}
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
