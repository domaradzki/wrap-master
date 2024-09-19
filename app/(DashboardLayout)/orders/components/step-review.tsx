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
import ReviewTape from "./review-tape";
import ReviewStretch from "./review-stretch";
import ReviewProduct from "./review-product";

export default function StepReview({ document }: { document: any }) {
  console.log("DOCUMENT", document);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Podstawowe informacje
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", margin: "10px 0" }}>
          <Grid item xs={12} sm={12}>
            <Box sx={{ padding: "2px 10px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Firma
              </Typography>
              <ListItem>
                <ListItemText primary={document.name} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box sx={{ padding: "2px 10px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Adres dostawy
              </Typography>
              <ListItem>
                <ListItemText primary={document.deliveryAddress} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ padding: "2px 10px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Transport
              </Typography>
              <ListItem>
                <ListItemText primary={document.transport} />
              </ListItem>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: "2px 10px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Data zamówienia
              </Typography>
              <ListItem>
                <ListItemText primary={dayjs(document.dateInsert).toString()} />
              </ListItem>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: "2px 10px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Data płatności
              </Typography>
              <ListItem>
                <ListItemText primary={dayjs(document.dateOfPay).toString()} />
              </ListItem>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box sx={{ padding: "2px 10px", height: "100%" }} boxShadow={2}>
              <Typography
                sx={{ margin: `5px 0 0 2px` }}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Details
              </Typography>
              <ListItem>
                <ListItemText primary={document.details} />
              </ListItem>
            </Box>
          </Grid>
        </Grid>
        {document.orders.map((item: any) => (
          <Fragment key={item.orderId}>
            {item.kind === "KT" && (
              <Typography variant="h6" gutterBottom>
                Szczegóły produktu
              </Typography>
            )}
            {item.kind === "KT" && item.type === "TPD" && (
              <ReviewTape item={item} />
            )}
            {item.kind === "KT" && item.type === "FS" && (
              <ReviewStretch item={item} />
            )}
            {item.kind === "KT" && item.type === "TW" && (
              <ReviewProduct item={item} />
            )}
          </Fragment>
        ))}
      </Fragment>
    </LocalizationProvider>
  );
}
