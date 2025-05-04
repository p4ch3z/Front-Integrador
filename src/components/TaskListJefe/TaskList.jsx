import React from "react";
import "./TaskList.css";
import Sidebar from "../asidebarJefe/Sidebar";
import UserHeader from "../UserHeader/UserHeader";

const TaskList = ({ tasks = [], onComplete, onRevert }) => {
  return (
    <div className="task-container">
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
      <h2 className="task-title">TAREAS</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="task-row">
              <td className="task-name">{task.name}</td>
              <td className="task-desc">{task.description}</td>
              <td className="task-status">
              <span className={`status-label ${task.status.toLowerCase().replace(" ", "-")}`}>
                  {task.status}
                </span>
                {task.status === "En curso" && (
                  <button className="status-button complete" onClick={() => onComplete(task)}>
                    Completar
                  </button>
                )}
                {task.status === "Completada" && (
                  <button className="status-button revert" onClick={() => onRevert(task)}>
                    Regresar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
