import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./Pages/Home";
import Kanto from "./Pages/Kanto";

import Navbar from "./Components/Navbar";
import Fetch from "./Pages/Fetch";

const darkTheme = createTheme({
  palette: {
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
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
