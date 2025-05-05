import React, { useState } from "react";
import { useEffect } from "react";
import "./BrigadeBoard.css";
import { Pencil, PlusCircle, MinusCircle } from "lucide-react";
import Sidebar from "../asidebarSupervisor/Sidebar";
import UserHeader from "../UserHeader/UserHeader";

const BrigadeBoard = () => {
  const [brigades, setBrigades] = useState([
    {
      id: "1",
      jefe: "Paola",
      botanico: "Pache",
      auxiliar: "Diego",
      coinvestigadores: ["Arley", "Ricardo", "Marta"],
      investigacion_id: "Sao Paulo"
    },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    investigacion_id: "",
    jefe: "",
    botanico: "",
    auxiliar: "",
    coinvestigadores: ["", "", ""],
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const expertos = [
    // Jefes
    { id: 1, nombre: "Paola", clasificacion: "jefe" },
    { id: 2, nombre: "Arturo", clasificacion: "jefe" },
    { id: 3, nombre: "Camila", clasificacion: "jefe" },
    { id: 4, nombre: "Mauricio", clasificacion: "jefe" },
    { id: 5, nombre: "Silvia", clasificacion: "jefe" },
  
    // Botánicos
    { id: 6, nombre: "Pache", clasificacion: "botanico" },
    { id: 7, nombre: "Milena", clasificacion: "botanico" },
    { id: 8, nombre: "Esteban", clasificacion: "botanico" },
    { id: 9, nombre: "Lina", clasificacion: "botanico" },
    { id: 10, nombre: "Carlos", clasificacion: "botanico" },
  
    // Auxiliares
    { id: 11, nombre: "Diego", clasificacion: "auxiliar" },
    { id: 12, nombre: "Carla", clasificacion: "auxiliar" },
    { id: 13, nombre: "Julián", clasificacion: "auxiliar" },
    { id: 14, nombre: "Natalia", clasificacion: "auxiliar" },
    { id: 15, nombre: "Santiago", clasificacion: "auxiliar" },
  
    // Coinvestigadores
    { id: 16, nombre: "Arley", clasificacion: "coinvestigador" },
    { id: 17, nombre: "Ricardo", clasificacion: "coinvestigador" },
    { id: 18, nombre: "Marta", clasificacion: "coinvestigador" },
    { id: 19, nombre: "Sofía", clasificacion: "coinvestigador" },
    { id: 20, nombre: "Tomás", clasificacion: "coinvestigador" },
    { id: 21, nombre: "Valeria", clasificacion: "coinvestigador" },
    { id: 22, nombre: "Luis", clasificacion: "coinvestigador" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("coinv")) {
      const index = parseInt(name.split("-")[1]);
      const updated = [...formData.coinvestigadores];
      updated[index] = value;
      setFormData((prev) => ({ ...prev, coinvestigadores: updated }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = () => {
    const lastId = Math.max(...brigades.map(obj => Number(obj.id)));
    formData.id = lastId+1;
    setBrigades([...brigades, formData]);
    setFormData({ id: "", investigacion_id: "", jefe: "", botanico: "", auxiliar: "", coinvestigadores: ["", "", ""] });
    setShowCreateForm(false);
    setNotification("Brigada creada ✅");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleEditClick = (index) => {
    const brigada = brigades[index];
    setFormData({ ...brigada });
    setEditingIndex(index);
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const handleUpdate = () => {
    const updated = [...brigades];
    updated[editingIndex] = formData;
    setBrigades(updated);
    setShowEditForm(false);
    setEditingIndex(null);
    setFormData({ id: "", investigacion_id: "", jefe: "", botanico: "", auxiliar: "", coinvestigadores: ["", "", ""] });
    setNotification("Brigada actualizada ✅");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Deseas eliminar esta brigada?")) {
      const updated = brigades.filter((_, i) => i !== index);
      setBrigades(updated);
      setNotification("Brigada eliminada ✅");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div className="brigade-container">
      <Sidebar />
      <UserHeader
        name="Paola Balaguera"
        avatar="../public/paola.jpg"
        onLogout={() => window.location.href = "/"}
      />

      <div className="brigade-header">
        <h2 className="brigade-title">Brigadas</h2>
        <div className="action-buttons">
          <button onClick={() => { setShowCreateForm(true); setShowEditForm(false); }}>
            <PlusCircle />
          </button>
          <button onClick={() => setIsEditMode(!isEditMode)}>
            <Pencil />
          </button>
          <button onClick={() => setIsDeleteMode(!isDeleteMode)}>
            <MinusCircle />
          </button>
        </div>
      </div>

      {notification && <div className="notification">{notification}</div>}

      <table className="brigade-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Investigacion</th>
            <th>Jefe de brigada</th>
            <th>Botanico</th>
            <th>Auxiliar</th>
            <th>Co-investigadores</th>
            {isEditMode && <th>Editar</th>}
            {isDeleteMode && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {brigades.map((b, index) => (
            <tr key={index}>
              <td>{b.id}</td>
              <td>{b.investigacion_id}</td>
              <td>{b.jefe}</td>
              <td>{b.botanico}</td>
              <td>{b.auxiliar}</td>
              <td>{b.coinvestigadores.join(", ")}</td>
              {isEditMode && (
                <td>
                  <button className="edit-circle" onClick={() => handleEditClick(index)}>✏️</button>
                </td>
              )}
              {isDeleteMode && (
                <td>
                  <button className="delete-circle" onClick={() => handleDelete(index)}>−</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>CREAR BRIGADA</h3>
            <button className="close-btn" onClick={() => setShowCreateForm(false)}>✖</button>
            {/* <input name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} /> */}
            <input name="investigacion_id" placeholder="Nombre de la Investigación" value={formData.investigacion_id} onChange={handleInputChange} />

            <select name="jefe" value={formData.jefe} onChange={handleInputChange}>
              <option value="">Selecciona jefe</option>
              {expertos.filter(e => e.clasificacion === "jefe").map(e => (
                <option key={e.id} value={e.nombre}>{e.nombre}</option>
              ))}
            </select>

            <select name="botanico" value={formData.botanico} onChange={handleInputChange}>
              <option value="">Selecciona botánico</option>
              {expertos.filter(e => e.clasificacion === "botanico").map(e => (
                <option key={e.id} value={e.nombre}>{e.nombre}</option>
              ))}
            </select>

            <select name="auxiliar" value={formData.auxiliar} onChange={handleInputChange}>
              <option value="">Selecciona auxiliar</option>
              {expertos.filter(e => e.clasificacion === "auxiliar").map(e => (
                <option key={e.id} value={e.nombre}>{e.nombre}</option>
              ))}
            </select>

            {formData.coinvestigadores.map((c, i) => (
              <select key={i} name={`coinv-${i}`} value={c} onChange={handleInputChange}>
                <option value="">Selecciona co-investigador</option>
                {expertos.filter(e => e.clasificacion === "coinvestigador").map(e => (
                  <option key={e.id} value={e.nombre}>{e.nombre}</option>
                ))}
              </select>
            ))}

            <button className="save-btn" onClick={handleCreate}>CREAR</button>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>EDITAR BRIGADA</h3>
            <button className="close-btn" onClick={() => setShowEditForm(false)}>✖</button>
            <input name="botanico" placeholder="Botánico" value={formData.botanico} onChange={handleInputChange} />
            <input name="auxiliar" placeholder="Auxiliar técnico" value={formData.auxiliar} onChange={handleInputChange} />
            {formData.coinvestigadores.map((c, i) => (
              <select key={i} name={`coinv-${i}`} value={c} onChange={handleInputChange}>
                <option value="">Selecciona co-investigador</option>
                {expertos.filter(e => e.clasificacion === "coinvestigador").map(e => (
                  <option key={e.id} value={e.nombre}>{e.nombre}</option>
                ))}
              </select>
            ))}
            <button className="save-btn" onClick={handleUpdate}>EDITAR</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrigadeBoard;
