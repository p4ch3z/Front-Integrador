// src/components/Expertos.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "lucide-react";
import "../assets/dashboard.css"; // reutiliza estilos

export default function Expertos() {
  const [expertos, setExpertos] = useState([]);

  useEffect(() => {
    // Simula llamada a tu API Django: GET /api/expertos/
    axios.get("/api/expertos/")
      .then((res) => setExpertos(res.data))
      .catch((err) => console.error("Error cargando expertos:", err));
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {/* Reutiliza tus botones de navegación */}
        <button onClick={() => (window.location.href = "/")}>
          <User /> {/* Cambia por el icono que prefieras */}
        </button>
        {/* ...otros botones */}
      </aside>

      <main className="main-content">
        <h1 className="dashboard-title">Expertos</h1>

        <section className="card-grid">
          {expertos.map((exp) => (
            <div key={exp.id} className="card">
              <User />
              <h2>{exp.nombre}</h2>
              <p>{exp.especialidad}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
