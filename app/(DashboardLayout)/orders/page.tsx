"use client";

import { reduceDocuments, ReducedDocument } from "@/lib/reducer";
import React from "react";
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
  Stack,
  Box,
  Tab,
} from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Link from "next/link";
import { IconButton, Tooltip } from "@mui/material";
import { CheckCircleOutline, Edit } from "@mui/icons-material";
import { newOrdersFetch } from "@/data/new-orders";

const OrdersPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"], // Key for the query
    queryFn: newOrdersFetch, // Function to fetch the data
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <PageContainer title="Zamówienia" description="Twoje zamówienia">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lista zamówień">
              <Tab label="Nowe" value="1" />
              <Tab label="Wprowadzone" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Stack
              spacing={2}
              sx={{
                pt: 2,
                pb: 4,
              }}
            >
              <Typography variant="h4">Nowe Zamówienia</Typography>
            </Stack>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Data wprowadzenia
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Numer dokumentu
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Zamawiający
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Symbol
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Handlowiec
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Zamkniety
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Szczegóły
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                      >
                        Akcje
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.map((order: ReducedDocument) => (
                      <TableRow key={order.documentId}>
                        <TableCell>
                          {new Date(order.dateInsert).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{order.signature}</TableCell>
                        <TableCell>{order.company.client}</TableCell>
                        <TableCell>{order.symbol}</TableCell>
                        <TableCell>{order.trader}</TableCell>
                        <TableCell>{order.closed ? "Yes" : "No"}</TableCell>
                        <TableCell>{order.details}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Link href={`/orders/${order.documentId}`} passHref>
                              <Tooltip title="Edytuj">
                                <IconButton>
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                            </Link>
                            <Tooltip title="Zatwierdź">
                              <IconButton>
                                <CheckCircleOutline />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>
    </PageContainer>
  );
};

export default OrdersPage;
