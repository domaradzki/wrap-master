import { Typography, Paper, Stack, Button } from "@mui/material";
import { Fragment, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl";
import { deleteDocumentWithItems } from "@/actions/delete-document-with-items";

interface DocumentDeleteProps {
  onClose: () => void;
  id: string;
}

type stepsKeys = {
  [key: string]: string;
};

const stepsLegend: stepsKeys = {
  TW: "Towar",
  TPD: "Taśma z nadrukiem",
  TPD32: "Taśma z nadrukiem",
  FSM: "Folia Stretch",
  FSMG: "Folia Stretch",
  FSRG: "Folia Stretch",
};

const DocumentDelete = ({ onClose, id }: DocumentDeleteProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const handleDeleteDocument = async () => {
    startTransition(() => {
      deleteDocumentWithItems(id)
        .then((data) => {
          if (data.error) {
            console.log("Error:", data.error);
            setError(data.error);
            toast.error("Aktualizacja nie powiodła się!");
          }
          if (data.success) {
            console.log("Success:", data.success);
            update();
            setSuccess(data.success);
            toast.success("Aktualizacja zakończona sukcesem!");
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
          setError("Coś poszło nie tak!");
          toast.error("Aktualizacja nie powiodła się!");
        });
    });

    onClose();
  };

  return (
    <Fragment>
      <Paper sx={{ marginBottom: 2, padding: 3 }}>
        <Typography component="h1" variant="h4" align="center">
          Kontrola zamówienia
        </Typography>
        <Fragment>
          <Typography variant="h6" align="center">
            Czy jesteś pewien że chcesz usunąć zamówienie?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button onClick={handleDeleteDocument} variant="contained">
              Usuń
            </Button>
            <Button onClick={onClose} variant="outlined">
              Anuluj
            </Button>
          </Stack>
        </Fragment>
      </Paper>
    </Fragment>
  );
};

export default DocumentDelete;
