import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Expertos from "./components/Expert/Expert";
import TaskList from "./components/TaskList/TaskList";
import NewsBoard from "./components/NewsBoard/NewsBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expertos" element={<Expertos/>} />
        <Route path="/tareas" element={<TaskList />} />
        <Route path="/novedades" element={<NewsBoard />} />
      </Routes>
    </BrowserRouter>
  );
}