import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Tape } from "./step-content";
import "dayjs/locale/pl";

export default function ReviewTape({ item }: { item: Tape }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Taśma z nadrukiem
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
                Data realizacji
              </Typography>
              <ListItem>
                <ListItemText
                  primary={dayjs(item.dateOfRealisation).toString()}
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
                Ilość
              </Typography>
              <ListItem>
                <ListItemText primary={`${item.quantity}${item.unit}`} />
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
                  primary={`${item.price.toFixed(2)}${
                    item.currency === "PLN" ? "zł" : item.currency
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
                  primary={`${item.netValue.toFixed(2)}${
                    item.currency === "PLN" ? "zł" : item.currency
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
                <ListItemText primary={`${item.margin}%`} />
              </ListItem>
            </Box>
          </Grid>

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
                  <ListItemText primary={item.printName} />
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
                  <ListItemText primary={`${item.tapeLong}mm`} />
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
                  <ListItemText primary={`${item.tapeWidth}mm`} />
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
                  <ListItemText primary={`${item.tapeThickness}my`} />
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
                  <ListItemText primary={item.tapeColor} />
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
                    primary={dayjs(item.dateOfAcceptation).toString()}
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
                  <ListItemText primary={`${item.roller}mm`} />
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
                  <ListItemText primary={item.glue} />
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
                  <ListItemText primary={item.numberOfColors} />
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
                  <ListItemText primary={item.color1} />
                </ListItem>
              </Box>
            </Grid>
            {item.numberOfColors && +item.numberOfColors >= 2 && (
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
                    <ListItemText primary={item.color2} />
                  </ListItem>
                </Box>
              </Grid>
            )}
            {item.numberOfColors && +item.numberOfColors === 3 && (
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
                    <ListItemText primary={item.color3} />
                  </ListItem>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
