import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pl";

import ReviewTape from "./review-edit-tape";
import ReviewStretch from "./review-edit-stretch";
import ReviewProduct from "./review-edit-product";
import { DocumentSchema } from "@/schemas/document";
import { z } from "zod";

export default function StepEditReview({
  document,
}: {
  document: z.infer<typeof DocumentSchema>;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <Fragment>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "20px 0" }}>
          Dane dokumentu
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", margin: "10px 0" }}>
          <Grid item xs={12} sm={9}>
            <TextField
              id="outlined-read-only-input"
              label="Firma"
              defaultValue={document.company.name}
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
              label="Transport"
              defaultValue={document.transport}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              id="outlined-read-only-input"
              label="Adres dostawy"
              defaultValue={document.deliveryAddress}
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
              label="Data zamówienia"
              defaultValue={dayjs(document.dateInsert)
                .format("DD/MM/YYYY")
                .toString()}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        {document.orders.map((item: any) => (
          <Fragment key={item.orderId}>
            {item.kind === "KT" && item.product.productCode === "TPD" && (
              <ReviewTape order={item} />
            )}
            {item.kind === "KT" && item.product.type === "FS" && (
              <ReviewStretch order={item} />
            )}
            {item.productCode === "TW" && <ReviewProduct order={item} />}
          </Fragment>
        ))}
      </Fragment>
    </LocalizationProvider>
  );
}
