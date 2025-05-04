import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelector.css";

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === "jefe") {
      navigate("/dashboardjefe");
    } else if (role === "supervisor") {
      navigate("/dashboardsupervisor");
    }
  };

  return (
    <div className="role-container">
      <h1 className="role-title">¿Cómo deseas ingresar?</h1>
      <div className="role-options">
        <button className="role-button jefe" onClick={() => handleSelectRole("jefe")}>
          Jefe de Brigada
        </button>
        <button className="role-button supervisor" onClick={() => handleSelectRole("supervisor")}>
          Supervisor
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
