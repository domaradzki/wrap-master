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
import { useAuthSession } from "@/context/sessionContext";

const HeadCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
});

interface NewDocumentsTableProps {
  documents: ReducedDocument[];
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

const NewDocumentsTable: React.FC<NewDocumentsTableProps> = ({
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
              <HeadCell>Szczegóły</HeadCell>
              <HeadCell>Akcje</HeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents &&
              (rowsPerPage > 0
                ? documents
                    .filter((doc) => doc.trader === name || isAdmin)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : documents
              ).map((document: ReducedDocument) => (
                <TableRow key={document.documentId}>
                  <TableCell>
                    {new Date(document.dateInsert).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{document.signature}</TableCell>
                  <TableCell>{document.company.name}</TableCell>
                  <TableCell>{document.trader}</TableCell>
                  <TableCell>{document.details}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Link
                        href={`/zamowienia/${document.documentId}`}
                        passHref
                      >
                        <Tooltip title="Wprowadź">
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

export default NewDocumentsTable;
