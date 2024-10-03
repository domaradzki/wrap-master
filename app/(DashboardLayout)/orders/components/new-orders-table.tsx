import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  styled,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import { ReducedDocument } from "@/lib/reducer";
import CustomTablePagination from "./table-pagination";

const HeadCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
});

interface NewOrdersTableProps {
  orders: ReducedDocument[];
  page: number;
  rowsPerPage: number;
  emptyRows: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const NewOrdersTable: React.FC<NewOrdersTableProps> = ({
  orders,
  page,
  rowsPerPage,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <HeadCell>Data wprowadzenia</HeadCell>
              <HeadCell>Numer dokumentu</HeadCell>
              <HeadCell>Zamawiający</HeadCell>
              <HeadCell>Symbol</HeadCell>
              <HeadCell>Handlowiec</HeadCell>
              <HeadCell>Zamkniety</HeadCell>
              <HeadCell>Szczegóły</HeadCell>
              <HeadCell>Dodaj</HeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              (rowsPerPage > 0
                ? orders.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : orders
              ).map((order: ReducedDocument) => (
                <TableRow key={order.documentId}>
                  <TableCell>
                    {new Date(order.dateInsert).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.signature}</TableCell>
                  <TableCell>{order.company.name}</TableCell>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell>{order.trader}</TableCell>
                  <TableCell>{order.closed ? "Yes" : "No"}</TableCell>
                  <TableCell>{order.details}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Link href={`/orders/${order.documentId}`} passHref>
                        <Tooltip title="Edytuj">
                          <IconButton>
                            <QueueOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[6, 12, 24, { label: "All", value: -1 }]}
                colSpan={8}
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={(props) => (
                  <CustomTablePagination {...props} />
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default NewOrdersTable;
