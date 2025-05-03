import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Expertos from "./components/Expert/Expert";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expertos" element={<Expertos/>} />
      </Routes>
    </BrowserRouter>
  );
}