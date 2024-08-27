"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
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
import PageContainer from "../components/container/PageContainer";

interface Order {
  documentId: number;
  dateInsert: string;
  signature: string;
  symbol: string;
  details: string;
  closed: boolean;
  documentStatus: number;
  client: string;
  companyId: number;
  trader: string;
  deliveryAddress: string;
  quantity: number;
  price: number;
  netValue: number;
  itemId: string;
  currency: string;
  exchangeRate: number;
  code: string;
  assortment: string;
  unit: string;
  type: string;
  kind: string;
  numberOfDocumentInvoice?: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <PageContainer title="Zamówienia" description="Twoje zamówienia">
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Date Insert</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Handlowiec</TableCell>
                <TableCell>Closed</TableCell>
                <TableCell>Kwota</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.documentId}>
                  <TableCell>{order.signature}</TableCell>
                  <TableCell>
                    {new Date(order.dateInsert).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell>{order.trader}</TableCell>
                  <TableCell>{order.closed ? "Yes" : "No"}</TableCell>
                  <TableCell>{order.netValues}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </PageContainer>
  );
};

export default OrdersPage;
