import React, { useState } from "react";
import "./Expert.css";
import UserHeader from "../UserHeader/UserHeader";
import { Link } from "react-router-dom";
import {
  RefreshCcw,
  Settings,
  FileText,
  BarChart2,
  Search,
  Users,
  House
} from "lucide-react";
import Sidebar from "../asidebarJefe/Sidebar";

const experts = [
  {
    image: "/paola.jpg",
    role: "JEFE DE BRIGADA",
    name: "Paola Balaguera",
  },
  {
    image: "/paola.jpg",
    role: "AUXILIAR TÉCNICO",
    name: "Carlos Martínez",
  },
  {
    image: "/paola.jpg",
    role: "BOTÁNICO",
    name: "Lucía Herrera",
  },
  {
    image: "/paola.jpg",
    role: "CO-INVESTIGADOR",
    name: "José Ramírez",
  },
  {
    image: "/paola.jpg",
    role: "CO-INVESTIGADOR",
    name: "Laura Gómez",
  },
];

const Expert = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleViewTasks = (name) => alert(`Ver tareas de ${name}`);
  const nav = (path) => (window.location.href = path);

  const handleAssignTask = () => {
    alert(`Tarea asignada a ${selectedExpert}:\n${taskName}\n${taskDescription}`);
    // Aquí podrías enviar los datos al backend
    setShowForm(false);
    setTaskName("");
    setTaskDescription("");
  };
  return (
    <div className="Expertos">
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
      <section className="expert-section">
        <h2 className="expert-title">EXPERTOS</h2>
        <div className="expert-grid">
          {experts.map((expert, index) => (
            <div className="expert-card" key={expert.name}>
              <img src={expert.image} alt={expert.name} className="expert-image" />
              <h3 className="expert-role">{expert.role}</h3>
              <p className="expert-name">{expert.name}</p>
              <button className="btn" onClick={() => nav("/tareasjefe")}>
                VER TAREAS
              </button>
              <button className="btn" onClick={() => {
                setSelectedExpert(expert.name);
                setShowForm(true);
              }}>
                ASIGNAR
              </button>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>ASIGNAR TAREA</h3>
              <p><strong>Para:</strong> {selectedExpert}</p>
              <label>NOMBRE DE TAREA</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <label>DESCRIPCION</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={handleAssignTask}>ASIGNAR</button>
                <button onClick={() => setShowForm(false)}>CANCELAR</button>
              </div>
            </div>
          </div>
        )}
              </section>
    </div>
  );
};

export default Expert;
