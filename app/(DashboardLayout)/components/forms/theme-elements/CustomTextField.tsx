import React from "react";
import { styled } from "@mui/material/styles";
import { TextField, TextFieldProps } from "@mui/material";

// Create a styled version of TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200],
  },
}));

// Create a forwardRef version of the custom TextField
const CustomTextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return <StyledTextField {...props} inputRef={ref} />;
  }
);

// Add a display name for better debugging
CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
