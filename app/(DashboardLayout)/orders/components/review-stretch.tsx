import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import { Stretch } from "./step-content";

export default function ReviewStretch({ item }: { item: Stretch }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Taśma z nadrukiem
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", margin: "10px 0" }}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={2}>
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
                <ListItemText primary={`${item.stretchThickness}my`} />
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
                Kolor
              </Typography>
              <ListItem>
                <ListItemText primary={item.stretchColor} />
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
                <ListItemText primary={`${item.netWeight}kg`} />
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
                Tuleja
              </Typography>
              <ListItem>
                <ListItemText primary={`${item.sleeve}g`} />
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
                <ListItemText primary={`${item.grossWeight}kg`} />
              </ListItem>
            </Box>
          </Grid>
        </Grid>
      </Fragment>
    </LocalizationProvider>
  );
}
