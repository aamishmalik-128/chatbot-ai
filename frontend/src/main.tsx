import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext/AuthContext";
import axios from 'axios'
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL="http://localhost:5000/api/v1"
axios.defaults.withCredentials= true
const theme = createTheme({
    typography: {
        fontFamily: "Fira Sans",
        allVariants: {
            color: "white",
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Toaster position="top-right"/>
                <App />
            </ThemeProvider>
        </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);