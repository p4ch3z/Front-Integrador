import React from "react";
import { Link } from "react-router-dom";
import {
  House,
  Users,
  Settings,
  FileText,
  BarChart2,
  Search,
} from "lucide-react";
import "../Dashboard/dashboard.css"; // Asegúrate de tener aquí las clases .sidebar, .sidebar-button, etc.
const nav = (path) => (window.location.href = path);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <button onClick={() => nav("/")}>
          <House />
        </button>
        <button onClick={() => nav("/expertos")}>
          <Users />
        </button>
        <button onClick={() => nav("/novedades")}>
          <FileText />
        </button>
    </aside>
  );
}