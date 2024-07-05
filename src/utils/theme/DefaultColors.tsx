import { createTheme } from "@mui/material/styles";
import { Noto_Sans } from "next/font/google";

export const nextFont = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    background: {
      default: "#FFFDFA",
      paper: "#FFFDFA",
    },
    primary: {
      main: "#0E1D31",
      light: "#749fd7",
      dark: "#0E1D31",
    },
    secondary: {
      main: "#E7E8F2",
      light: "#F5F6FA",
      dark: "#E7E8F2",
    },
    success: {
      main: "#15AA2C",
      light: "#8DF19D",
      dark: "#15AA2C",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#539BFF",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FF0000",
      light: "##ff9999",
      dark: "#FF0000",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FF6B00",
      light: "##ffc499",
      dark: "#FF6B00",
      contrastText: "#ffffff",
    },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#1C1B1E",
      secondary: "#79767B",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: nextFont.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: nextFont.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: nextFont.style.fontFamily,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: nextFont.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
        "*::-webkit-scrollbar": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
  },
});

export { baselightTheme };
