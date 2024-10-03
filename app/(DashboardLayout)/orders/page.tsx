"use client";

import React, { SyntheticEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Typography, Stack, Box, Tab } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { newOrdersFetch } from "@/data/new-orders";
import NewOrdersTable from "./components/new-orders-table";
import { getDocuments } from "@/actions/get-documents";
import DBOrdersTable from "./components/db-orders-table";
import { useSession } from "next-auth/react";

const OrdersPage = () => {
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const name = useSession().data?.user?.name;
  console.log(name);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"], // Key for the query
    queryFn: newOrdersFetch, // Function to fetch the data
  });

  const {
    data: DBorders,
    isLoading: DBisLoading,
    error: DBerror,
  } = useQuery({
    queryKey: ["dborders"], // Key for the query
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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }

  console.log(DBorders);
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
                py: 2,
              }}
            >
              <Typography variant="h4">Nowe Zamówienia</Typography>
            </Stack>
            <NewOrdersTable
              orders={orders ?? []}
              page={page}
              rowsPerPage={rowsPerPage}
              emptyRows={emptyRows}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TabPanel>
          <TabPanel value="2">
            <Stack
              spacing={2}
              sx={{
                py: 2,
              }}
            >
              <Typography variant="h4">Aktualne Zamówienia</Typography>
            </Stack>
            {!DBisLoading && (
              <DBOrdersTable
                orders={DBorders ?? []}
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </PageContainer>
  );
};

export default OrdersPage;
