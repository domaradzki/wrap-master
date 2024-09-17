import React, { Fragment } from "react";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";

export default function StepReview({ input, data }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Podstawowe informacje
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", margin: "10px 0" }}>
          <Grid item xs={12} sm={2}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Data zamówienia
              </Typography>
              <ListItem>
                <ListItemText primary={dayjs(input.dateInsert).toString()} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Data realizacji
              </Typography>
              <ListItem>
                <ListItemText
                  primary={dayjs(input.dateOfRealisation).toString()}
                />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Data płatności
              </Typography>
              <ListItem>
                <ListItemText primary={dayjs(input.dateOfPay).toString()} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Klient
              </Typography>
              <ListItem>
                <ListItemText primary={input.client} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Ilość
              </Typography>
              <ListItem>
                <ListItemText primary={`${input.quantity}${data.unit}`} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Cena
              </Typography>
              <ListItem>
                <ListItemText
                  primary={`${input.price.toFixed(2)}${
                    data.currency === "PLN" ? "zł" : data.currency
                  }`}
                />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Wartość
              </Typography>
              <ListItem>
                <ListItemText
                  primary={`${input.netValue.toFixed(2)}${
                    data.currency === "PLN" ? "zł" : data.currency
                  }`}
                />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Marża
              </Typography>
              <ListItem>
                <ListItemText primary={`${input.margin}%`} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Details
              </Typography>
              <ListItem>
                <ListItemText primary={input.details} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Transport
              </Typography>
              <ListItem>
                <ListItemText primary={input.transport} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Adres dostawy
              </Typography>
              <ListItem>
                <ListItemText primary={input.deliveryAddress} />
              </ListItem>
            </Box>
          </Grid>
        </Grid>
        {data.kind === "KT" && (
          <Typography variant="h6" gutterBottom>
            Szczegóły produktu
          </Typography>
        )}
        {data.kind === "KT" && data.type === "TPD" && (
          <Grid
            container
            mt={2}
            spacing={2}
            sx={{ width: "100%", margin: "10px 0" }}
          >
            <Grid item xs={12} sm={4}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Nadruk
                </Typography>
                <ListItem>
                  <ListItemText primary={input.printName} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Długość
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.tapeLong}mm`} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Szerokość
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.tapeWidth}mm`} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Grubość
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.tapeThickness}my`} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Taśma
                </Typography>
                <ListItem>
                  <ListItemText primary={input.tapeColor} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Data akceptacji projektu
                </Typography>
                <ListItem>
                  <ListItemText
                    primary={dayjs(input.dateOfAcceptation).toString()}
                  />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Wałek
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.roller}mm`} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Klej
                </Typography>
                <ListItem>
                  <ListItemText primary={input.glue} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Kolory
                </Typography>
                <ListItem>
                  <ListItemText primary={input.numberOfColors} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Kolor 1
                </Typography>
                <ListItem>
                  <ListItemText primary={input.color1} />
                </ListItem>
              </Box>
            </Grid>
            {+input.numberOfColors >= 2 && (
              <Grid item xs={12} sm={2}>
                <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                  <Typography
                    sx={{ margin: `5px 0 0 2px` }}
                    color="textSecondary"
                    display="block"
                    variant="caption"
                  >
                    Kolor 2
                  </Typography>
                  <ListItem>
                    <ListItemText primary={input.color2} />
                  </ListItem>
                </Box>
              </Grid>
            )}
            {+input.numberOfColors === 3 && (
              <Grid item xs={12} sm={2}>
                <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                  <Typography
                    sx={{ margin: `5px 0 0 2px` }}
                    color="textSecondary"
                    display="block"
                    variant="caption"
                  >
                    Kolor 3
                  </Typography>
                  <ListItem>
                    <ListItemText primary={input.color3} />
                  </ListItem>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
        {data.kind === "KT" && data.type === "FS" && (
          <Grid
            container
            mt={2}
            spacing={2}
            sx={{ width: "100%", margin: "10px 0" }}
          >
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Tuleja
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.sleeve}g`} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Kolor
                </Typography>
                <ListItem>
                  <ListItemText primary={input.stretchColor} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Grubość
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.stretchThickness}my`} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Waga netto
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.netWeight}kg`} />
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ padding: "2px", height: "100%" }} boxShadow={2}>
                <Typography
                  sx={{ margin: `5px 0 0 2px` }}
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Waga brutto
                </Typography>
                <ListItem>
                  <ListItemText primary={`${input.grossWeight}kg`} />
                </ListItem>
              </Box>
            </Grid>
          </Grid>
        )}
      </Fragment>
    </LocalizationProvider>
  );
}
