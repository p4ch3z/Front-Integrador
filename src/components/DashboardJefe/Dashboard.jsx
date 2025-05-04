import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import UserHeader from "../UserHeader/UserHeader";
import Sidebar from "../asidebarJefe/Sidebar";
import "./dashboard.css";
import {
  RefreshCcw,
  Settings,
  FileText,
  BarChart2,
  Search,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    setNombre("Paola"); // Reemplaza con tu llamada a BD
    const f = format(new Date(), "EEEE d MMMM yyyy", { locale: es });
    setFecha(f.charAt(0).toUpperCase() + f.slice(1));
  }, []);

  const nav = (path) => (window.location.href = path);

  return (
    <div className="dashboard">
      <Sidebar />
      <UserHeader
        name="Paola Balaguera"
        avatar="../public/paola.jpg"
        onLogout={() => {
          // Aquí puedes limpiar token, redirigir, etc.
          alert("Sesión cerrada");
          // Por ejemplo: navigate("/login");
        }}
      />
      <main className="main-content">
        <h1 className="dashboard-title">Dashboard Jefe de brigada</h1>

        <section className="welcome-card">
          <div className="info">
            <p>Hola <strong>{nombre}</strong>,</p>
            <h1>¡Bienvenid@s!</h1>
            <span>{fecha}</span>
          </div>
          <img
            src="https://i.pravatar.cc/60"
            alt="Perfil"
            className="profile-pic"
          />
        </section>

        <section className="card-grid">
          <div className="card">
            <Search />
            <h2>Investigación</h2>
          </div>
          <div className="card">
            <BarChart2 />
            <h2>Analíticas</h2>
          </div>
          <div className="card">
            <FileText />
            <h2>Documentos</h2>
          </div>
        </section>
      </main>
    </div>
);
}