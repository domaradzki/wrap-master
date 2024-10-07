"use client";

import React, { SyntheticEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Typography,
  Stack,
  Box,
  Tab,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import PageContainer from "../components/container/PageContainer";
import NewOrdersTable from "./components/new-orders-table";
import DBOrdersTable from "./components/db-orders-table";
import { getDocuments } from "@/actions/get-documents";
import { newOrdersFetch } from "@/data/new-orders";
import { DocumentSchema } from "@/schemas/document";
import { z } from "zod";
import { useAuthSession } from "@/context/sessionContext";

const OrdersPage = () => {
  const name = useAuthSession().user?.name;
  const role = useAuthSession().user?.role;

  const [value, setValue] = useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [isAdmin, setIsAdmin] = useState(role === "ADMIN");

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"], // Key for the query
    queryFn: newOrdersFetch, // Function to fetch the data
  });

  const {
    data: documents,
    isLoading: DBisLoading,
    error: DBerror,
  } = useQuery({
    queryKey: ["documents"], // Key for the query
    queryFn: () => getDocuments(name ?? ""), // Function to fetch the data
  });
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (orders?.length ?? 0))
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAdminMode = (event: SyntheticEvent) => {
    setIsAdmin(!isAdmin);
  };

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
          <Box sx={{ borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lista zamówień">
              <Tab label="Nowe" value="1" />
              <Tab label="Wprowadzone" value="2" />
            </TabList>
          </Box>
          {role === "ADMIN" && (
            <Stack
              direction="row"
              sx={{ justifyContent: "end", marginTop: "-48px" }}
            >
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleAdminMode} checked={isAdmin} />
                  }
                  label="Tryb administratora"
                />
              </Grid>
            </Stack>
          )}
          <TabPanel value="1">
            <Stack
              spacing={2}
              sx={{
                py: 2,
              }}
            >
              <Typography variant="h4">Nowe zamówienia</Typography>
            </Stack>
            <NewOrdersTable
              documents={orders ?? []}
              page={page}
              rowsPerPage={rowsPerPage}
              emptyRows={emptyRows}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              isAdmin={isAdmin}
            />
          </TabPanel>
          <TabPanel value="2">
            <Stack
              spacing={2}
              sx={{
                py: 2,
              }}
            >
              <Typography variant="h4">Aktualne zamówienia</Typography>
            </Stack>
            {!DBisLoading && documents && (
              <DBOrdersTable
                documents={
                  documents as unknown as z.infer<typeof DocumentSchema>[]
                }
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                isAdmin={isAdmin}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </PageContainer>
  );
};

export default OrdersPage;
