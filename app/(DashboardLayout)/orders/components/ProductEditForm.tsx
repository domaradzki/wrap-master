import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Product {
  itemId: number;
  quantity: number;
  price: number;
  netValue: number;
  assortment: string;
}

interface ProductEditFormProps {
  product: Product | null;
  onClose: () => void;
}

const ProductEditForm = ({ product, onClose }: ProductEditFormProps) => {
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [price, setPrice] = useState(product?.price || 0);
  const [netValue, setNetValue] = useState(product?.netValue || 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", quantity, price, netValue);
    onClose();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Edytuj produkt</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Ilość"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
          <TextField
            label="Cena"
            type="number"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
          <TextField
            label="Wartość netto"
            type="number"
            value={netValue}
            onChange={(event) => setNetValue(Number(event.target.value))}
          />
          <Button type="submit">Zapisz</Button>
          <Button onClick={onClose}>Anuluj</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProductEditForm;
