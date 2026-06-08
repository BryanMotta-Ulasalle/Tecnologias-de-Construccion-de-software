import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import WithWorkers from "./pages/WithWorkers";
import WithoutWorkers from "./pages/WithoutWorkers";
import Main from "./layout/Main";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<Main />}>
          <Route path="/with-workers" element={<WithWorkers />} />
          <Route path="/without-workers" element={<WithoutWorkers />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
