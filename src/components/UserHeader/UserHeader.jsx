import React from "react";
import "./UserHeader.css";

const nav = (path) => (window.location.href = path);
const UserHeader = ({ name, avatar, onLogout }) => {
  return (
    <div className="user-header">
      <img src={avatar} alt="Usuario" className="user-avatar" />
      <span className="user-name">{name}</span>
      <button className="logout-button" title="Cerrar sesión" onClick={() => nav("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  );
};

export default UserHeader;