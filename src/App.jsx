import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardJefe from "./components/DashboardJefe/Dashboard";
import DashboardSupervisor from "./components/DashboardSupervisor/Dashboard";
import ExpertosJefe from "./components/ExpertJefe/Expert";
import TaskListJefe from "./components/TaskListJefe/TaskList";
import NewsBoardJefe from "./components/NewsBoardJefe/NewsBoard";
import RoleSelector from "./components/RoleSelector";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/dashboardsupervisor" element={<DashboardSupervisor />} />        
        <Route path="/dashboardjefe" element={<DashboardJefe />} />
        <Route path="/expertosjefe" element={<ExpertosJefe/>} />
        <Route path="/tareasjefe" element={<TaskListJefe />} />
        <Route path="/novedadesjefe" element={<NewsBoardJefe />} />
      </Routes>
    </BrowserRouter>
  );
}