import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Link from "next/link";

const StepSuccess = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Sukces!!!
      </Typography>
      <Typography variant="subtitle1">
        Twoje zamówienie zostało poprawnie zapisane. Możesz je monitorować, lub
        edytować w zakładce wprowadzone, gdzie znajdziesz wszystkie swoje
        zamówienia.
      </Typography>
      <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href="/zamowienia">
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginLeft: 1 }}
          >
            OK
          </Button>
        </Link>
      </Stack>
    </React.Fragment>
  );
};

export default StepSuccess;
