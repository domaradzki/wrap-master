import { useRouter } from "next/router";
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
} from "@mui/material";
import PageContainer from "../../components/container/PageContainer";

const fetchDocument = async (id: string) => {
  const response = await fetch(`/api/documents/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch document");
  }
  const data = await response.json();
  return data;
};

const DocumentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  //   const {
  //     data: document,
  //     isLoading,
  //     error,
  //   } = useQuery({
  //     queryKey: ["document", id], // Key for the query
  //     queryFn: () => fetchDocument(id as string), // Function to fetch the data
  //   });

  //   if (isLoading) {
  //     return <Typography>Loading...</Typography>;
  //   }

  //   if (error) {
  //     return <Typography color="error">{error.message}</Typography>;
  //   }

  return (
    <PageContainer title={id} description="Szczegóły dokumentu">
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Numer dokumentu</TableCell>
                <TableCell>Data wprowadzenia</TableCell>
                <TableCell>Zamawiający</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Handlowiec</TableCell>
                <TableCell>Zamkniety</TableCell>
                <TableCell>Szczegóły</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow key={document.documentId}>
                <TableCell>{document.signature}</TableCell>
                <TableCell>
                  {new Date(document.dateInsert).toLocaleDateString()}
                </TableCell>
                <TableCell>{document.client}</TableCell>
                <TableCell>{document.symbol}</TableCell>
                <TableCell>{document.trader}</TableCell>
                <TableCell>{document.closed ? "Yes" : "No"}</TableCell>
                <TableCell>{document.details}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add a form or other details as needed */}
        <Typography variant="h5">Produkty</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produkt</TableCell>
                <TableCell>Ilość</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Wartość netto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {document.products.map((product) => (
                <TableRow key={product.itemId}>
                  <TableCell>{product.assortment}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.netValue}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </PageContainer>
  );
};

export default DocumentPage;
