import { ReducedDocument } from "@/lib/reducer";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

interface DetailsEditFormProps {
  order: ReducedDocument | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const DetailsEditForm = ({
  order,
  onSubmit,
  onClose,
}: DetailsEditFormProps) => {
  const [assortment, setAssortment] = useState(order?.signature || "");
  const [client, setClient] = useState(order?.client || "");
  const [trader, setTrader] = useState(order?.trader || "");
  const [details, setDetails] = useState(order?.details || "");
  const [closed, setClosed] = useState(order?.closed || false);
  const [companyId, setCompanyId] = useState(order?.companyId || 0);
  const [currency, setCurrency] = useState(order?.currency || "");
  const [dateInsert, setDateInsert] = useState(order?.dateInsert || "");
  const [deliveryAddress, setDeliveryAddress] = useState(
    order?.deliveryAddress || ""
  );
  const [documentId, setDocumentId] = useState(order?.documentId || 0);
  const [documentStatus, setDocumentStatus] = useState(
    order?.documentStatus || 0
  );
  const [exchangeRate, setExchangeRate] = useState(order?.exchangeRate || null);
  const [signature, setSignature] = useState(order?.signature || "");
  const [symbol, setSymbol] = useState(order?.symbol || "");
  const [timestamp, setTimestamp] = useState(order?.timestamp || 0);

  const handleChangeAssortment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAssortment(event.target.value);
  };

  const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient(event.target.value);
  };

  const handleChangeTrader = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrader(event.target.value);
  };

  const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
  };

  const handleChangeClosed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClosed(event.target.checked);
  };

  const handleChangeCompanyId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyId(Number(event.target.value));
  };

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleChangeDateInsert = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateInsert(event.target.value);
  };

  const handleChangeDeliveryAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryAddress(event.target.value);
  };

  const handleChangeDocumentId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumentId(Number(event.target.value));
  };

  const handleChangeDocumentStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumentStatus(Number(event.target.value));
  };

  const handleChangeExchangeRate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExchangeRate(Number(event.target.value));
  };

  const handleChangeSignature = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignature(event.target.value);
  };

  const handleChangeSymbol = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  const handleChangeTimestamp = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimestamp(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedOrder = {
      ...order,
      // signature: assortment,
      client,
      trader,
      details,
      closed,
      companyId,
      currency,
      dateInsert,
      deliveryAddress,
      documentId,
      documentStatus,
      exchangeRate,
      signature,
      symbol,
      timestamp,
    };
    onSubmit(event);
  };

  return (
    <Container sx={{ maxWidth: "100%", padding: 2, margin: "20px" }}>
      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Typography variant="h6">Edytuj dokument</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="closed"
                  checked={closed}
                  onChange={handleChangeClosed}
                />
              }
              label="Zamkniety"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Numer dokumentu"
              value={signature}
              onChange={handleChangeSignature}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Zamawiający"
              value={client}
              onChange={handleChangeClient}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Handlowiec"
              value={trader}
              onChange={handleChangeTrader}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Szczegóły"
              value={details}
              onChange={handleChangeDetails}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID firmy"
              type="number"
              value={companyId}
              onChange={handleChangeCompanyId}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Waluta"
              value={currency}
              onChange={handleChangeCurrency}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Data wprowadzenia"
              type="datetime-local"
              value={dateInsert}
              onChange={handleChangeDateInsert}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Adres dostawy"
              value={deliveryAddress}
              onChange={handleChangeDeliveryAddress}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="ID dokumentu"
              type="number"
              value={documentId}
              onChange={handleChangeDocumentId}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Status dokumentu"
              type="number"
              value={documentStatus}
              onChange={handleChangeDocumentStatus}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Kurs wymiany"
              type="number"
              value={exchangeRate || ""}
              onChange={handleChangeExchangeRate}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Symbol"
              value={symbol}
              onChange={handleChangeSymbol}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Czas"
              type="number"
              value={timestamp}
              onChange={handleChangeTimestamp}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="outlined">
              <i className="fa fa-save" aria-hidden="true"></i> Zapisz
            </Button>
            <Button onClick={onClose} variant="outlined">
              <i className="fa fa-times" aria-hidden="true"></i> Anuluj
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default DetailsEditForm;
