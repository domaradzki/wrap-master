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
import PageContainer from "../../../components/container/PageContainer";
import { useEffect, useState } from "react";
import { getDocumentByIdWithItems } from "@/actions/get-documents";
import { z } from "zod";
import { DocumentSchema } from "@/schemas/document";
import DocumentEdit from "../../components/Edit/document-edit";

const HeadCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
});

const DocumentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const {
    data: document,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["document"], // Key for the query
    queryFn: () => getDocumentByIdWithItems(id), // Function to fetch the data
  });

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  console.log("document", document);

  const [activeDocument, setActiveDocument] =
    useState<z.infer<typeof DocumentSchema>>();

  useEffect(() => {
    if (document) {
      setActiveDocument(document as unknown as z.infer<typeof DocumentSchema>);
    }
  }, [document]);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Handle form submission logic here
  //   console.log("Form submitted:", activeDocument);
  //   handleCloseEditModal();
  // };
  console.log("documentactive", activeDocument);

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
              {!isLoading && document && (
                <TableRow key={document.documentId}>
                  <TableCell>
                    {new Date(document.dateInsert).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{document.signature}</TableCell>
                  <TableCell>{document.company.name}</TableCell>
                  <TableCell>{document.deliveryAddress}</TableCell>
                  <TableCell>{document.trader}</TableCell>
                  <TableCell>
                    {document.closed ? "Zamkniety" : "Otwarty"}
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
                document?.orders.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order?.product?.assortment}</TableCell>
                    <TableCell>{order?.product?.type}</TableCell>
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
              <i className="fa fa-save"></i> Edycja
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
            <DocumentEdit
              document={activeDocument}
              // onSubmit={handleSubmit}
              onClose={handleCloseEditModal}
            />
          )}
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default DocumentPage;
