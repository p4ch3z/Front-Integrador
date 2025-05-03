import React from "react";
import "./Expert.css";

const experts = [
  {
    image: "https://via.placeholder.com/100",
    role: "JEFE DE BRIGADA",
    name: "Paola Balaguera",
  },
  {
    image: "https://via.placeholder.com/100",
    role: "AUXILIAR TECNICO",
    name: "Paola Balaguera",
  },
  {
    image: "https://via.placeholder.com/100",
    role: "BOTANICO",
    name: "Paola Balaguera",
  },
  {
    image: "https://via.placeholder.com/100",
    role: "CO-INVESTIGADORES",
    name: "Paola Balaguera",
  },
  {
    image: "https://via.placeholder.com/100",
    role: "CO-INVESTIGADORES",
    name: "Paola Balaguera",
  },
];

export const Expert = () => {
  const handleViewTasks = (name) => alert(`Ver tareas de ${name}`);
  const handleAssign = (name) => alert(`Asignar tareas a ${name}`);

  return (
    <div className="expert-section">
      <h2>EXPERTOS</h2>
      <div className="expert-grid">
        {experts.map((expert, index) => (
          <div className="expert-card" key={index}>
            <img src={expert.image} alt={expert.name} className="expert-image" />
            <h3 className="expert-role">{expert.role}</h3>
            <p className="expert-name">{expert.name}</p>
            <button className="btn" onClick={() => handleViewTasks(expert.name)}>
              VER TAREAS
            </button>
            <button className="btn" onClick={() => handleAssign(expert.name)}>
              ASIGNAR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};