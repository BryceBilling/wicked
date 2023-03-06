import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
      dark: "#004c40",
      light: "#4db6ac",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff8f00",
      dark: "#c56000",
      light: "#ffbd45",
      contrastText: "#000",
    },
    error: {
      main: "#f44336",
      dark: "#ba000d",
      light: "#e57373",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
      color: "#333",
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
      color: "#333",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
      color: "#333",
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "0.00735em",
      color: "#333",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
      color: "#333",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
      color: "#333",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.2,
      letterSpacing: "0.00938em",
      color: "#333",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.2,
      letterSpacing: "0.00714em",
      color: "#333",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      color: "#333",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.01071em",
      color: "#333",
    },
    button: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      color: "#fff",
      textTransform: "none",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      color: "#757575",
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.16667em",
      color: "#333",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
        text: {
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          "&:active": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#00796b",
            color: "#fff",
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            borderColor: "#00796b",
            color: "#00796b",
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#ff8f00",
            color: "#fff",
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            borderColor: "#ff8f00",
            color: "#ff8f00",
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
        elevation1: {
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.23)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 0, 0, 0.87)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00796b",
            },
          },
        },
      },
    },
  },
});

export default theme;
