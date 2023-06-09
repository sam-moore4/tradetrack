import React from "react";
import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Investments from "scenes/investments";
import Login from "scenes/login";
import Signup from "scenes/signup";
import NewInvestment from "components/NewInvestment";
import Active from "scenes/active";
import History from "scenes/history";
import Geography from "scenes/geography";

function App() {
  useEffect(() => {
    document.title = "Trade Track"; // Change the title here
  }, []);

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/active" element={<Active />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/history" element={<History />} />
              <Route path="/addnewinvestment" element={<NewInvestment />} />
              <Route path="/geography" element={<Geography />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
