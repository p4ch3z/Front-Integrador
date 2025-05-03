import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Expertos  from "./components/Expertos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expertos" element={<Expertos />} />
      </Routes>
    </BrowserRouter>
  );
}