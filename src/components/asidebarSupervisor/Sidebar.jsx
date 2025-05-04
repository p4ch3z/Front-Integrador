import React from "react";
import { Link } from "react-router-dom";
import {
  House,
  Boxes,
  Settings,
  FileText,
  BarChart2,
  Search,
} from "lucide-react";
import "../DashboardJefe/dashboard.css"; // Asegúrate de tener aquí las clases .sidebar, .sidebar-button, etc.
const nav = (path) => (window.location.href = path);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <button onClick={() => nav("/dashboardsupervisor")}>
          <House />
        </button>
        <button onClick={() => nav("/brigadasupervisor")}>
          <Boxes />
        </button>
        <button onClick={() => nav("/investigacionsupervisor")}>
          <FileText />
        </button>
    </aside>
  );
}