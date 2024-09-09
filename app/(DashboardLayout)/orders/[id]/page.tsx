"use client";

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

const OrderPage = ({ params }: { params: { id: string } }) => {
  // const [order, setOrder] = useState<ReducedDocument | null>(null);
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
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

  const [editedOrder, setEditedOrder] = useState<ReducedDocument | null>(null);

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
                <TableCell>Data wprowadzenia</TableCell>
                <TableCell>Numer dokumentu</TableCell>
                <TableCell>Zamawiający</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Handlowiec</TableCell>
                <TableCell>Status dokumentu</TableCell>
                <TableCell>Szczegóły</TableCell>
                <TableCell>Akcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order && (
                <TableRow key={order.documentId}>
                  <TableCell>
                    {new Date(order.dateInsert).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.signature}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell>{order.trader}</TableCell>
                  <TableCell>
                    {order.closed ? "Zamkniety" : "Otwarty"}
                  </TableCell>
                  <TableCell>{order.details}</TableCell>
                  <TableCell>
                    <Button onClick={handleOpenEditModal}>Edytuj</Button>
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
                <TableCell>Produkt</TableCell>
                <TableCell>Ilość</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Wartość netto</TableCell>
                <TableCell>Status produktu</TableCell>
                <TableCell>Akcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order &&
                order.products.map((product) => (
                  <TableRow key={product.orderId}>
                    <TableCell>{product.assortment}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.netValue}</TableCell>
                    <TableCell>{product.status || "Brak statusu"}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenModal(product)}>
                        Edytuj
                      </Button>
                    </TableCell>
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
