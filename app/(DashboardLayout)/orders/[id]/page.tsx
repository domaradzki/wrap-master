"use client";

import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Container,
  Box,
  Button,
  Modal,
  Stack,
  Grid,
} from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import { useEffect, useState } from "react";
import Checkout from "../components/checkout";
import { newOrderActiveFetch } from "@/data/new-active-order";
import { Document, Order } from "@/utils/structure";

const HeadCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
});

const OrderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order"], // Key for the query
    queryFn: () => newOrderActiveFetch({ id }), // Function to fetch the data
  });

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const [activeDocument, setActiveDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (order) {
      setActiveDocument({ ...order });
    }
  }, [order]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", activeDocument);
    // Update the order data here
    // setOrder(activeDocument);
    handleCloseEditModal();
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }
  let zloty = Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  return (
    <PageContainer title="Zamówienie" description="Szczegóły zamówienia">
      <Container sx={{ maxWidth: "100%", padding: 2 }}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h4">Dane dokumentu</Typography>
        </Box>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <HeadCell>Data wprowadzenia</HeadCell>
                <HeadCell>Numer dokumentu</HeadCell>
                <HeadCell>Zamawiający</HeadCell>
                <HeadCell>Adres</HeadCell>
                <HeadCell>Handlowiec</HeadCell>
                <HeadCell>Status dokumentu</HeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading && order && (
                <TableRow key={order.documentId}>
                  <TableCell>
                    {new Date(order.dateInsert).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.signature}</TableCell>
                  <TableCell>{order.company.name}</TableCell>
                  <TableCell>{order.company.deliveryAddress}</TableCell>
                  <TableCell>{order.trader}</TableCell>
                  <TableCell>
                    {order.closed ? "Zamkniety" : "Otwarty"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Typography variant="h5">Produkty</Typography>
        </Box>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <HeadCell>Lp</HeadCell>
                <HeadCell>Produkt</HeadCell>
                <HeadCell>Typ</HeadCell>
                <HeadCell>Cena</HeadCell>
                <HeadCell>Ilość</HeadCell>
                <HeadCell>Wartość netto</HeadCell>
                <HeadCell>Data realizacji</HeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                order?.orders.map((order: Order, index) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.product.assortment}</TableCell>
                    <TableCell>{order.product.type}</TableCell>
                    <TableCell>{zloty.format(order.price)}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{zloty.format(order.netValue)}</TableCell>
                    <TableCell>
                      {order.dateOfRealisation.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginTop: 2, justifyContent: "end" }}
        >
          <Grid item xs={12}>
            <Button onClick={handleOpenEditModal} variant="outlined">
              <i className="fa fa-save" aria-hidden="true"></i> Weryfikacja
            </Button>
          </Grid>
        </Stack>
      </Container>

      {/* Modal for editing document */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "98%",
            overflowY: "scroll",
          }}
        >
          {activeDocument && (
            <Checkout
              document={activeDocument}
              onSubmit={handleSubmit}
              onClose={handleCloseEditModal}
            />
          )}
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default OrderPage;
