import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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
  netWeight?: number;
  grossWeight?: number;
  stretchThickness?: number;
  stretchColor?: string;
  sleeve?: number;
}

interface StepStretchFormProps {
  item: Item;
  handleProductChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<number>
  ) => void;
}

export default function StepStretchForm({
  item,
  handleProductChange,
}: StepStretchFormProps) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Parametry folii stretch
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="sleeve"
            name="sleeve"
            label="Tuleja"
            onChange={handleProductChange}
            value={item.sleeve}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="stretchColor"
            name="stretchColor"
            label="Kolor folii"
            onChange={handleProductChange}
            value={item.stretchColor}
            type="text"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="stretchThickness"
            name="stretchThickness"
            label="Grubość folii"
            onChange={handleProductChange}
            value={item.stretchThickness}
            type="text"
            InputProps={{
              endAdornment: <InputAdornment position="end">my</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="netWeight"
            name="netWeight"
            label="Waga netto"
            onChange={handleProductChange}
            value={item.netWeight}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="grossWeight"
            name="grossWeight"
            label="Waga brutto"
            onChange={handleProductChange}
            value={item.grossWeight}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="quantity"
            name="quantity"
            label="Ilość"
            onChange={handleProductChange}
            value={item.quantity}
            type="number"
            fullWidth
            autoComplete="quantity"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{item.unit}</InputAdornment>
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
            onChange={handleProductChange}
            value={item.price}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">zł</InputAdornment>,
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
            onChange={handleProductChange}
            value={item.netValue}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
            fullWidth
            autoComplete="net value"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required sx={{ minWidth: 120 }}>
            <InputLabel id="marginLabel">Marża</InputLabel>
            <Select
              native
              labelId="marginLabel"
              label="Marża"
              id="margin"
              name="margin"
              value={item.margin}
              type="number"
              onChange={handleProductChange}
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
      </Grid>
    </React.Fragment>
  );
}
