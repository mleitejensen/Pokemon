import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Kanto from "./Pages/Kanto";
import Fetch from "./Pages/Fetch";
import Pokemon from "./Pages/Pokemon";

const darkTheme = createTheme({
  palette: {
    primary: {
      50: "#C0CCD9",
      100: "#A5B8CF",
      200: "#6A96CA",
      300: "#4886D0",
      400: "#2178DD",
      500: "#096BDE",
      600: "#1B62B5",
      700: "#265995",
      800: "#2F4968",
      900: "#2F3C4C",
    },
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar></Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kanto" element={<Kanto />} />
            <Route path="/fetch" element={<Fetch />} />
            <Route path="/pokemon/:name" element={<Pokemon />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
