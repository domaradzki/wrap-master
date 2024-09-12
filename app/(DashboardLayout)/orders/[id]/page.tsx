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
} from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import { ReducedDocument } from "@/lib/reducer";
import { useEffect, useState } from "react";
import ProductEditForm from "../components/ProductEditForm";
import DetailsEditForm from "../components/DetailsEditForm";
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

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Order | null>(null);

  interface Product {
    orderId: string;
    assortment: string;
    quantity: number;
    price: number;
    netValue: number;
    status?: string;
  }

  const handleOpenModal = (product: Order) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const [editedOrder, setEditedOrder] = useState<Document | null>(null);

  useEffect(() => {
    if (order) {
      setEditedOrder({ ...order });
    }
  }, [order]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", editedOrder);
    // Update the order data here
    // setOrder(editedOrder);
    handleCloseEditModal();
  };
  console.log("ORDER", order);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }

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
                <HeadCell>Produkt</HeadCell>
                <HeadCell>Ilość</HeadCell>
                <HeadCell>Cena</HeadCell>
                <HeadCell>Wartość netto</HeadCell>
                <HeadCell>Typ</HeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                order?.orders.map((order: Order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.product.assortment}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.netValue}</TableCell>
                    <TableCell>{order.product.type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
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
          }}
        >
          <DetailsEditForm
            order={editedOrder}
            onSubmit={handleSubmit}
            onClose={handleCloseEditModal}
          />
        </Box>
      </Modal>

      {/* Modal for editing product */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <ProductEditForm
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default OrderPage;
