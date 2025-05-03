import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "../assets/dashboard.css";
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
      <aside className="sidebar">
        <button onClick={() => nav("/")}>
          <RefreshCcw />
        </button>
        {/* Ya no hay Brigadas */}
        <button onClick={() => nav("/expertos")} title="Expertos">
          <Users />
        </button>
        <button onClick={() => nav("/tools")}>
          <Settings />
        </button>
        <button onClick={() => nav("/documents")}>
          <FileText />
        </button>
        <button onClick={() => nav("/analytics")}>
          <BarChart2 />
        </button>
        <button onClick={() => nav("/search")}>
          <Search />
        </button>
      </aside>

      <main className="main-content">
        <h1 className="dashboard-title">Dashboard</h1>

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