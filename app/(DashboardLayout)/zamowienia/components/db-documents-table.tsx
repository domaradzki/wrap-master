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
import { z } from "zod";

import CustomTablePagination from "./table-pagination";
import { IconEdit } from "@tabler/icons-react";
import { DocumentSchema } from "../../../../schemas/document";
import { useAuthSession } from "@/context/sessionContext";

const HeadCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
});

interface DBDocumentsTableProps {
  documents: z.infer<typeof DocumentSchema>[];
  page: number;
  rowsPerPage: number;
  emptyRows: number;
  isAdmin: boolean;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const DBDocumentsTable: React.FC<DBDocumentsTableProps> = ({
  documents,
  page,
  rowsPerPage,
  emptyRows,
  isAdmin,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const name = useAuthSession().user?.name;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <HeadCell>Data wprowadzenia</HeadCell>
              <HeadCell>Numer dokumentu</HeadCell>
              <HeadCell>Zamawiający</HeadCell>
              <HeadCell>Handlowiec</HeadCell>
              <HeadCell>Wartość</HeadCell>
              <HeadCell>Status</HeadCell>
              <HeadCell>Akcje</HeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents &&
              documents.length > 0 &&
              (rowsPerPage > 0
                ? documents
                    .filter((doc) => doc.trader === name || isAdmin)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : documents
              ).map((document: z.infer<typeof DocumentSchema>) => (
                <TableRow key={document.id}>
                  <TableCell>
                    {new Date(document.dateInsert).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{document.signature}</TableCell>
                  <TableCell>{document.company.name}</TableCell>
                  <TableCell>{document.trader}</TableCell>
                  <TableCell>
                    {/* {document.orders.reduce(
                      (prev, next) => prev.netValue + next.netValue,
                      0
                    )} */}
                  </TableCell>
                  <TableCell>{document.details}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Link
                        href={`/zamowienia/wprowadzone/${document.id}`}
                        passHref
                      >
                        <Tooltip title="Edytuj">
                          <IconButton>
                            <IconEdit />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                colSpan={8}
                count={
                  documents.filter((doc) => doc.trader === name || isAdmin)
                    .length
                }
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

export default DBDocumentsTable;
