import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#1A365D",
    },
    secondary: {
      main: "#F2BF00",
      contrastText: "#1A365D",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
