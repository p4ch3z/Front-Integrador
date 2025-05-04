import React, { useState } from "react";
import "./NewsBoard.css";
import { Pencil, PlusCircle, MinusCircle } from "lucide-react";
import Sidebar from "../asidebarJefe/Sidebar";
import UserHeader from "../UserHeader/UserHeader";

const NewsBoard = () => {
  const [news, setNews] = useState([
    {
      name: "Terreno",
      type: "Grave",
      description: "En el terreno se han generado deslizamientos de tierra",
      date: "1 de mayo del 2025",
      comments: "",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    date: "",
    comments: "",
  });

  const toggleForm = () => {
    setShowCreateForm(true);
    setShowEditForm(false);
    setFormData({
      name: "",
      type: "",
      description: "",
      date: "",
      comments: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta novedad?")) {
      const updated = news.filter((_, i) => i !== index);
      setNews(updated);
      setNotification("Novedad eliminada ✅");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleSave = () => {
    setNews([...news, formData]);
    setFormData({ name: "", type: "", description: "", date: "", comments: "" });
    setShowCreateForm(false);
    setNotification("Novedad creada ✅");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setFormData({ ...news[index] });
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const handleUpdate = () => {
    const updated = [...news];
    updated[editingIndex] = formData;
    setNews(updated);
    setEditingIndex(null);
    setFormData({ name: "", type: "", description: "", date: "", comments: "" });
    setShowEditForm(false);
    setNotification("Novedad actualizada ✅");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="news-container">
      <Sidebar />
      <UserHeader
        name="Paola Balaguera"
        avatar="../public/paola.jpg"
        onLogout={() => {
          alert("Sesión cerrada");
        }}
      />

      <div className="news-header">
        <h2 className="news-title">Novedades</h2>
        <div className="action-buttons">
          <button title="Crear" onClick={toggleForm}>
            <PlusCircle size={22} />
          </button>
          <button title="Modo Editar" onClick={() => setIsEditMode(!isEditMode)}>
            <Pencil size={22} />
          </button>
          <button title="Modo Quitar" onClick={() => setIsDeleteMode(!isDeleteMode)}>
            <MinusCircle />
          </button>
        </div>
      </div>

      {notification && <div className="notification">{notification}</div>}

      <table className="news-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Comentarios</th>
            {isEditMode && <th>Editar</th>}
            {isDeleteMode && <th>Quitar</th>}
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td>{item.comments}</td>
              {isEditMode && (
                <td>
                  <button className="edit-circle" onClick={() => handleEditClick(index)}>✏️</button>
                </td>
              )}
              {isDeleteMode && (
                <td>
                  <button className="delete-circle" onClick={() => handleDelete(index)}>
                    <MinusCircle />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateForm && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>CREAR NOVEDAD</h3>
          <button className="close-btn" onClick={() => setShowCreateForm(false)}>✖</button>
          <input name="name" placeholder="Nombre de la novedad" value={formData.name} onChange={handleInputChange} />
          <input name="type" placeholder="Tipo" value={formData.type} onChange={handleInputChange} />
          <input name="description" placeholder="Descripción" value={formData.description} onChange={handleInputChange} />
          <input name="date" placeholder="Fecha inicio" value={formData.date} onChange={handleInputChange} />
          <input name="comments" placeholder="Comentarios" value={formData.comments} onChange={handleInputChange} />
          <button className="save-btn" onClick={handleSave}>CREAR</button>
        </div>
      </div>
    )}

      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>EDITAR NOVEDAD</h3>
            <button className="close-btn" onClick={() => {
              setShowEditForm(false);
              setEditingIndex(null);
            }}>✖</button>
            <input name="name" placeholder="Nombre de la novedad" value={formData.name} onChange={handleInputChange} />
            <input name="type" placeholder="Tipo" value={formData.type} onChange={handleInputChange} />
            <input name="description" placeholder="Descripción" value={formData.description} onChange={handleInputChange} />
            <input name="date" placeholder="Fecha inicio" value={formData.date} onChange={handleInputChange} />
            <input name="comments" placeholder="Comentarios" value={formData.comments} onChange={handleInputChange} />
            <button className="save-btn" onClick={handleUpdate}>GUARDAR CAMBIOS</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsBoard;
